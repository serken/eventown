<template>
  <v-col class="margin-top-50">
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
.margin-top-50
  margin-top: 50px

.flex
  display: flex
  flex-direction: row
</style>
