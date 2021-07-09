<template>
  <v-card class="mt-4">
    <v-card-title>
      <span class="headline">Редактирование</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-form
            v-model="valid"
            @submit.prevent="updateCompany"
            class="update-form"
          >
            <v-row>
              <v-col>
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
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <img
                  contain
                  class="event-img"
                  height="200"
                  width="200"
                  :src="`${companyPic}`"
                >
                </img>
              </v-col>
              <v-col>
                <v-row>
                  <v-file-input
                    v-model="image"
                    label="Изображение профиля"
                  ></v-file-input>
                </v-row>
                <v-row>
                  <v-btn
                    color="success"
                    class="mr-4"
                    @click="updateImage"
                  >
                    Сохранить
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                type="submit"
                @click="updateCompany"
              >
                Обновить
              </v-btn>
            </v-card-actions>

          </v-form>
        </validation-observer>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
const IMG = 'https://mizez.com/custom/mizez/img/general/no-image-available.png'
export default {

  data: function() {
    return {
      company: {},
      errors: {},
      valid: true,
      pic: '',
      image: '',
    }
  },

  computed: {
    companyPic: function() {
      return this.pic.length > 0 ? this.pic : IMG
    },

    ...mapGetters("user", ["currentUser"])
  },

  mounted: function() {
    this.fetchCompany()
  },

  methods: {
    fetchCompany: function() {
      this.$api.fetchCompany(this.currentUser.company.id).then((company) => {
        this.company = company
        this.pic = this.company.pic
      })
    },

    updateCompany: function() {
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

      this.$api.updateCompany(this.company.id, params).then((response) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Компания обновлена' })
        this.fetchCurrentUser()
        this.$router.push('/')
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    updateImage: function() {
      const params = {
        image: this.image
      }
      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.updateCompany(this.currentUser.id, formData).then((data) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Изображение организации успешно обновлено. Красава' })
        this.company = data
        this.pic = data.pic
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    ...mapActions("user", ["fetchCurrentUser"])
  }
}
</script>
