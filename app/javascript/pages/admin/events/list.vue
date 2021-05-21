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
        :items="events"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Events</v-toolbar-title>
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
                  New Event
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
                        v-model="editedItem.title"
                        label="Заголовок"
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
                      <v-select
                        v-model="editedItem.event_type"
                        label="Тип события"
                        :items="eventTypes"
                        required
                      ></v-select>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.cost"
                        label="Стоимость"
                      ></v-text-field>

                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.remote_url"
                        label="Ссылка на организацию"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.start_date"
                        label="Дата и время начала"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.location"
                        label="Локация"
                      ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-text-field
                        v-model="editedItem.phone_number"
                        label="Телефон"
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
import { EVENT_TYPES } from '../../../constants'

export default {
  data: function() {
    return {
      events: [],
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Title', value: 'title' },
        { text: 'Active', value: 'active' },
        { text: 'Description', value: 'description' },
        { text: 'Start Date', value: 'start_date' },
        { text: 'pic', value: 'pic' },
        { text: 'Cost', value: 'cost' },
        { text: 'Remote Url', value: 'remote_url' },
        { text: 'location', value: 'location' },
        { text: 'Phone', value: 'phone_number' },
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

    eventTypes: function() {
      return EVENT_TYPES
    }
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
      this.$adminApi.fetchEvents().then((data) => {
        this.events = data.events
      })
    },

    editItem: function(item) {
      this.editedIndex = this.events.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem: function(item) {
      this.editedIndex = this.events.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm: function() {
      this.$adminApi.deleteEvent(this.editedItem.id).then((data) => {
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
        this.$adminApi.updateEvent(this.editedItem.id, this.editedItem).then((data) => {
          this.fetchData()
        })
      } else {
        this.$adminApi.createEvent(this.editedItem).then((data) => {
          this.fetchData()
        })
      }
      this.close()
    },
  }
}


</script>
