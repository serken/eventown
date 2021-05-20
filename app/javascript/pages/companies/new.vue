<template>
  <v-card>
      <v-card-title>
        <span class="headline">Новая организация</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="name"
              :error-messages="errors.name"
              label="Название"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-textarea
              v-model="description"
              :error-messages="errors.description"
              label="Описание"
              required
              clearable
            ></v-textarea>
          </v-row>

          <v-row>
            <v-file-input
              v-model="image"
              :error-messages="errors.image"
              label="Изображение"
            ></v-file-input>
          </v-row>

          <v-row>
            <v-text-field
              v-model="remote_url"
              :error-messages="errors.remote_url"
              label="Ссылка на организацию"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="address"
              :error-messages="errors.address"
              label="Адрес"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="phone"
              :error-messages="errors.phone"
              label="Телефон"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="twitter"
              :error-messages="errors.twitter"
              label="Twitter"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="facebook"
              :error-messages="errors.facebook"
              label="Facebook"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="instagram"
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
          Создать Событие
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
export default {

  data: function() {
    return {
      name: '',
      description: '',
      instagram: '',
      image: '',
      facebook: '',
      remote_url: '',
      twitter: '',
      address: '',
      phone: '',
      errors: {}
    }
  },

  computed: {
  },

  methods: {
    createEvent: function() {
      const params = {
        name: this.name,
        description: this.description,
        image: this.image,
        instagram: this.instagram,
        remote_url: this.remote_url,
        facebook: this.facebook,
        start_time: this.start_time,
        twitter: this.twitter,
        address: this.address,
        phone: this.phone
      }

      let formData = new FormData()

      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.createEvent(formData).then((response) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Компания создана, ожидайте подтверждение от администрации' })
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
