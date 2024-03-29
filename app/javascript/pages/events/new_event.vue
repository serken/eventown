<template>
  <v-card>
      <v-card-title>
        <span class="headline">Новое событие</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="title"
              :error-messages="errors.title"
              label="Заголовок"
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
            <v-select
              v-model="event_type"
              :error-messages="errors.event_type"
              label="Тип события"
              :items="eventTypes"
              required
            ></v-select>
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
              v-model="cost"
              :error-messages="errors.cost"
              label="Стоимость"
            ></v-text-field>

          </v-row>
          <v-row>
            <v-text-field
              v-model="remote_url"
              :error-messages="errors.remote_url"
              label="Ссылка на организацию"
            ></v-text-field>
          </v-row>


          <v-row>
            <v-menu
              ref="date_menu"
              v-model="date_menu"
              :close-on-content-click="false"
              :return-value.sync="start_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start_date"
                  label="Дата начала"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="start_date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="date_menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.date_menu.save(start_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-row>

          <v-row>
            <v-menu
              ref="time_menu"
              v-model="time_menu"
              :close-on-content-click="false"
              :return-value.sync="start_time"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start_time"
                  label="Время начала"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="start_time"
                no-title
                scrollable
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="time_menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.time_menu.save(start_time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-menu>
          </v-row>

          <v-row>
            <v-text-field
              v-model="duration"
              :error-messages="errors.duration"
              label="Длительность"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="location"
              :error-messages="errors.location"
              label="Локация"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="phone_number"
              :error-messages="errors.phone_number"
              label="Телефон"
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
import { EVENT_TYPES } from '../../constants'
export default {

  data: function() {
    return {
      date_menu: false,
      time_menu: false,
      title: '',
      description: '',
      event_type: '',
      image: '',
      cost: '',
      remote_url: '',
      start_date: '',
      start_time: '',
      location: '',
      phone_number: '',
      duration: '',
      errors: {}
    }
  },

  computed: {
    eventTypes: function() {
      return EVENT_TYPES
    }
  },

  methods: {
    createEvent: function() {
      const params = {
        title: this.title,
        description: this.description,
        event_type: this.event_type,
        image: this.image,
        cost: this.cost,
        remote_url: this.remote_url,
        start_date: this.start_date,
        start_time: this.start_time,
        duration: this.duration,
        location: this.location,
        phone_number: this.phone_number
      }

      let formData = new FormData()

      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.createEvent(formData).then((response) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Событие создано' })
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
