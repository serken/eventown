<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="companies"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Companies</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Company
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Название"
                        required
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-checkbox
                        v-model="editedItem.active"
                        label="Активен"
                      ></v-checkbox>
                    </v-row>

                    <v-row>
                      <v-textarea
                        v-model="editedItem.description"
                        label="Описание"
                        required
                        clearable
                      ></v-textarea>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.remote_url"
                        label="Ссылка на организацию"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.address"
                        label="Адрес"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Телефон"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.facebook"
                        label="Facebook"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.twitter"
                        label="Twitter"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.instagram"
                        label="Instagram"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="fetchData"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      companies: [],
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Active', value: 'active' },
        { text: 'Description', value: 'description' },
        { text: 'pic', value: 'pic' },
        { text: 'Remote Url', value: 'remote_url' },
        { text: 'Phone', value: 'phone' },
        { text: 'Facebook', value: 'facebook' },
        { text: 'Twitter', value: 'twitter' },
        { text: 'Instagram', value: 'instagram' },
        { text: 'Created', value: 'created_at' },
        { text: 'Updated', value: 'updated_at' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }
  },

  computed: {
    formTitle: function() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog: function(val) {
      val || this.close()
    },
    dialogDelete: function(val) {
      val || this.closeDelete()
    },
  },

  mounted: function() {
    this.fetchData()
  },

  methods: {
    fetchData: function() {
      this.$adminApi.fetchCompanies().then((data) => {
        this.companies = data.companies
      })
    },

    editItem: function(item) {
      this.editedIndex = this.companies.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem: function(item) {
      this.editedIndex = this.companies.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm: function() {
      this.$adminApi.deleteCompany(this.editedItem.id).then((data) => {
        this.fetchData()
      })
      this.closeDelete()
    },

    close: function() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete: function() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save: function() {
      if (this.editedIndex > -1) {
        this.$adminApi.updateCompany(this.editedItem.id, this.editedItem).then((data) => {
          this.fetchData()
        })
      } else {
        this.$adminApi.createCompany(this.editedItem).then((data) => {
          this.fetchData()
        })
      }
      this.close()
    },
  }
}


</script>
