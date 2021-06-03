<template>
  <v-card class="mt-4">
    <v-card-title>
      <span class="headline">Редактирование</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field
            v-model="company.name"
            :error-messages="errors.name"
            label="Имя организации"
            required
          ></v-text-field>
        </v-row>

        <v-row>
          <v-textarea
            v-model="company.description"
            :error-messages="errors.description"
            label="Информация об организации"
            required
            clearable
          ></v-textarea>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.remote_url"
            :error-messages="errors.remote_url"
            label="Ссылка на организацию"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.address"
            :error-messages="errors.address"
            label="Адрес"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.phone"
            :error-messages="errors.phone"
            label="Телефон"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.twitter"
            :error-messages="errors.twitter"
            label="Twitter"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.facebook"
            :error-messages="errors.facebook"
            label="Facebook"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="company.instagram"
            :error-messages="errors.instagram"
            label="Instagram"
          ></v-text-field>
        </v-row>

      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        class="mr-4"
        @click="createEvent"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
export default {

  data: function() {
    return {
      company: {},
      errors: {}
    }
  },

  computed: {
  },

  mounted: function() {
    this.fetchCompany()
  },

  methods: {
    fetchCompany: function() {
      this.$api.fetchCompany(this.$router.currentRoute.params.id).then((company) => {
        this.company = company
      })
    },
    createEvent: function() {
      const params = {
        name: this.company.name,
        description: this.company.description,
        instagram: this.company.instagram,
        remote_url: this.company.remote_url,
        facebook: this.company.facebook,
        instagram: this.company.instagram,
        twitter: this.company.twitter,
        address: this.company.address,
        phone: this.company.phone
      }

      let formData = new FormData()

      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.updateCompany(formData).then((response) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Компания обновлена' })
        this.fetchCurrentUser()
        this.$router.push('/')
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    ...mapActions("user", ["fetchCurrentUser"])
  }
}
</script>
