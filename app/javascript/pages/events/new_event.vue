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
            <v-text-field
              v-model="start_date"
              :error-messages="errors.start_date"
              label="Дата и время начала"
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

export default {

  data: function() {
    return {
      title: '',
      description: '',
      event_type: '',
      image: '',
      cost: '',
      remote_url: '',
      start_date: '',
      location: '',
      phone_number: '',
      errors: {}
    }
  },

  computed: {
    eventTypes: function() {
      return [
        { text: "Вечеринка", value: 'party'},
        { text: "Мастер Класс", value: 'master_class'},
        { text: "Выставка", value: 'performance'},
        { text: "Открытие", value: 'opening'}
      ]
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
        location: this.location,
        phone_number: this.phone_number
      }

      let formData = new FormData()

      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.createEvent(formData).then((response) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Событие создано' })
        this.$router.push('/')
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    }
  }
}
</script>
