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
    <filters ref="filters" @update-filters="updateFilters" @update-date-filter="updateDateFilter" />
    <v-chip
      v-model="!!$route.query.search"
      v-if="$route.query.search"
      filter
      outlined
      @click="removeSearch"
    >
      {{ $route.query.search }}
    </v-chip>
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

    props: {
      params: {
        type: Object,
        default: () => {}
      }
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
      this.fetchFilteredEvents()
      this.nearestEvents()
    },

    watch: {
      filters: function(oldV, newV) {
        const el = this.$refs.filters;

        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.$el.scrollIntoView(!0);
          this.fetchFilteredEvents()
        }
      },

      '$route.query.search': function(oldV, newV) {
        const el = this.$refs.filters;

        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.$el.scrollIntoView(!0);
          this.fetchFilteredEvents()
        }
      }
    },

    computed: {
      eventTypes: function() {
        return EVENT_TYPES
      },
      ...mapGetters("events", ["getEvents"])
    },

    methods: {
      fetchFilteredEvents: function() {
        this.dialog = true
        const params = {
          page: this.page, per_page: this.perPage,
          filters: this.filters, date_filter: this.date_filter,
          search: this.$route.query.search
        }

        this.$api.fetchEvents({ params: params }).then((data) => {
          this.total = Math.ceil(data.meta.total / this.perPage)
          this.setEvents(data.events)
          this.dialog = false
        })
      },

      removeSearch: function() {
        this.$router.push({ path: '/', query: {}}).catch(() => {})
      },

      nearestEvents: function() {
        this.$api.nearestEvents().then((data) => {
          this.nearEvents = data
        })
      },

      pageChanged: function() {
        this.fetchFilteredEvents()
      },

      updateFilters: function(filters) {
        this.filters = filters
        this.fetchFilteredEvents()
      },

      updateDateFilter: function(dateFilter) {
        this.date_filter = dateFilter
        this.fetchFilteredEvents()
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
