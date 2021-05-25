<template>
  <div>
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
    Ближайшие события:
    <slider :objects="nearEvents">

    </slider>
    <filters @update-filters="updateFilters" @update-date-filter="updateDateFilter" />
    <v-pagination v-model="page" :total-visible="7" :length="total" :per-page="perPage" @input="pageChanged" />
    <v-row>
      <v-col v-for="event in getEvents" :key="event.id">
        <card :event="event"/>
      </v-col>
    </v-row>
    <v-pagination v-model="page" :total-visible="7" :length="total" :per-page="perPage" @input="pageChanged" />
  </div>
</template>

<script>
  import card from "../../components/card"
  import filters from "../../components/filters"
  import slider from "../../components/slider"

  import { mapActions, mapState, mapGetters } from "vuex"
  import { EVENT_TYPES } from '../../constants'

  export default {
    components: {
      card: card,
      filters: filters,
      slider: slider
    },

    data: function() {
      return {
        page: 1,
        perPage: 12,
        total: null,
        dialog: false,
        filters: [],
        date_filter: [],
        nearEvents: []
      }
    },

    mounted: function() {
      this.fetchFiltereEvents()
      this.nearestEvents()
    },

    computed: {
      eventTypes: function() {
        return EVENT_TYPES
      },
      ...mapGetters("events", ["getEvents"])
    },

    methods: {
      fetchFiltereEvents: function() {
        this.dialog = true
        this.$api.fetchEvents({ params: { page: this.page, per_page: this.perPage, filters: this.filters, date_filter: this.date_filter }}).then((data) => {
          this.total = Math.ceil(data.meta.total / this.perPage)
          this.setEvents(data.events)
          this.dialog = false
        })
      },

      nearestEvents: function() {
        this.$api.nearestEvents().then((data) => {
          this.nearEvents = data
        })
      },

      pageChanged: function() {
        this.fetchFiltereEvents()
      },

      updateFilters: function(filters) {
        this.filters = filters
        this.fetchFiltereEvents()
      },

      updateDateFilter: function(dateFilter) {
        this.date_filter = dateFilter
        this.fetchFiltereEvents()
      },

      ...mapActions("events", ["setEvents"])
    },
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
