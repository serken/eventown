<template>
  <div>
    <div>
      HERE EVENT BASE
    </div>
    <v-tabs>
      <v-tab :to="`/events/${event.id}/about`">О Событии</v-tab>
      <v-tab :to="`/events/${event.id}/comments`">Комментарии</v-tab>
    </v-tabs>
    <router-view :event="event" @update-event="updateEvent"/>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
    },

    data: function() {
      return {
        page: 1,
        perPage: 10,
        total: null,
        dialog: false,
        filters: [],
        date_filter: [],
        event: {}
      }
    },

    mounted: function() {
      this.fetchEvent()
    },

    methods: {
      fetchEvent: function() {
        this.$api.fetchEvent(this.$router.currentRoute.params.id).then((event) => {
          this.event = event
        })
      },

      updateEvent: function(event) {
        this.event = event
      }
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
