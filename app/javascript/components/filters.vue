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


      <v-menu
        ref="date_range_menu"
        v-model="date_range_menu"
        :close-on-content-click="false"
        :return-value.sync="date_filter"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date_filter"
            label="Время начала"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date_filter"
          no-title
          scrollable
          range
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="date_range_menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.date_range_menu.save(date_filter);updateDate()"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  data: function() {
    return {
      filters: [],
      date_range_menu: false,
      date_filter: []
    }
  },

  computed: {
    ...mapGetters("user", ["currentUser"])
  },

  watch: {
    filters: function() {
      this.$emit('update-filters', this.filters)
    }
  },

  methods: {
    updateDate: function() {
      this.$emit('update-date-filter', this.date_filter)
    }
  }
}
</script>
