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
              label="Заголовок"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-textarea
              v-model="description"
              label="Описание"
              required
              clearable
            ></v-textarea>
          </v-row>

          <v-row>
            <v-select
              v-model="event_type"
              label="Тип события"
              :items="eventTypes"
              required
            ></v-select>
          </v-row>

          <v-row>

            <v-file-input
              v-model="image"
              label="Изображение"
            ></v-file-input>

          </v-row>

          <v-row>
            <v-text-field
              v-model="cost"
              label="Стоимость"
            ></v-text-field>

          </v-row>
          <v-row>
            <v-text-field
              v-model="remote_url"
              label="Ссылка на организацию"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="start_date"
              label="Дата и время начала"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="location"
              label="Локация"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="phone_number"
              label="Телефон"
            ></v-text-field>
          </v-row>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
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
  computed: {
    eventTypes: function() {
      return [
        { text: "Вечеринка", value: 0},
        { text: "Мастер Класс", value: 1},
        { text: "Выставка", value: 2},
        { text: "Открытие", value: 3}
      ]
    }
  },
  methods: {
    createEvent: function() {

    }
  }
}
</script>
