<template>
  <v-card class="mt-5 pa-5">
    {{ event.description }}
  </v-card>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
