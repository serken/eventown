<template>
  <v-col>
    <filters />
    <v-row>
      <card />
      <card />
      <card />
    </v-row>
  </v-col>
</template>

<script>
  import card from "../../components/card"
  import filters from "../../components/filters"
  export default {
    components: {
      card: card,
      filters: filters
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
