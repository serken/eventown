<template>
  <v-card class="mt-5 pa-5">
    {{ company.description }}
  </v-card>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
