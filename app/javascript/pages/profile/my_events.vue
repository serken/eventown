<template>
  <v-col>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Проводим индексацию событий, подождите
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <card v-for="event in currentUser.events" :event="event" :key="event.id"/>
    </v-row>
  </v-col>
</template>

<script>
  import card from "../../components/card"
  import filters from "../../components/filters"

  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
      card: card,
      filters: filters
    },

    data: function() {
      return {
        dialog: false,
      }
    },

    mounted: function() {
    },

    methods: {
    },

    computed: {
      ...mapGetters("user", ["currentUser"])
    },

    watch: {
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
