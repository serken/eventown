<template>
  <div>
    <v-card-text>
      <h2 class="title mb-2">
        Быстрые фильтры
      </h2>

      <v-chip-group
        v-model="filters"
        column
        multiple
      >
        <v-chip
          filter
          outlined
        >
          Вечеринки
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Мастер класс
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Выставки
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Открытия
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Детям
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Взрослым
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-btn text @click="createEvent">
      Добавить событие
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  data: function() {
    return {
      filters: []
    }
  },

  computed: {
    ...mapGetters("user", ["currentUser"])
  },

  methods: {
    createEvent: function() {
      this.$router.push('/create_event')
    }
  },

  watch: {
    filters: function() {
      this.$emit('update-filters', this.filters)
    }
  }
}
</script>
