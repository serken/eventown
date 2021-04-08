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
    <filters @update-filters="updateFilters" @update-date-filter="updateDateFilter" />
    <v-pagination v-model="page" :total-visible="7" :length="total" :per-page="perPage" @input="pageChanged" />
    <v-row>
      <card v-for="event in events" :event="event" :key="event.id"/>
    </v-row>
    <v-pagination v-model="page" :total-visible="7" :length="total" :per-page="perPage" @input="pageChanged" />
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
        page: 1,
        perPage: 6,
        total: null,
        dialog: false,
        filters: [],
        date_filter: [],
        events: []
      }
    },

    mounted: function() {
      this.fetchFiltereEvents()
    },

    methods: {
      fetchFiltereEvents: function() {
        this.dialog = true

        this.$api.fetchEvents({ params: { page: this.page, per_page: this.perPage, filters: this.filters, date_filter: this.date_filter, id: this.favoriteIds, favorite: true }}).then((data) => {
          this.total = Math.ceil(data.meta.total / this.perPage)
          this.events = data.events
          this.dialog = false
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
      }
    },

    computed: {
      favoriteIds: function() {
        return this.currentUser.favorite_events.map(i => i.favoritable_id)
      },
      ...mapGetters("user", ["currentUser"])
    },

    watch: {
      'currentUser.favorite_events': function() {
        this.fetchFiltereEvents()
      }
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
