<template>
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
        Выставки
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
</template>
<script>
export default {
  data: function() {
    return {
      filters: []
    }
  }
}
</script>
