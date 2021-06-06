<template>
  <div>
    <div>
      <v-row>
        <v-col left>
          <v-img
            :src="event.pic"
            height="250"
            contain
          >

          </v-img>
        </v-col>
        <v-col>
          <v-list>
            <v-list-item>
               {{ event.title }}
            </v-list-item>
            <v-list-item>
              Организатор: 
            </v-list-item>
            <v-list-item>
              Когда: {{ event.start_time }} {{ formatedDate }}
            </v-list-item>
            <v-list-item>
              Стоимость: {{ event.cost }}
            </v-list-item>
             <v-list-item>
              Длительность: {{ event.duration }}
            </v-list-item>
            <v-list-item>
              Ссылка на событие: {{ event.remote_url }}
            </v-list-item>
            <v-list-item>
              Телефон: {{ event.phone_number }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-tabs>
      <v-tab :to="`/events/${event.id}/about`">О Событии</v-tab>
      <v-tab :to="`/events/${event.id}/comments`">Комментарии</v-tab>
      <v-tab v-if="isMyEvent" :to="`/events/${event.id}/edit`">Обновить Событие</v-tab>
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

    computed: {
      isMyEvent: function() {
        return this.currentUser && this.currentUser.events.map(i => i.id).includes(this.event.id)
      },

      formatedDate: function() {
        return this.$moment(this.event.start_date).format("dddd, D MMMM YYYY.")
      },

      ...mapGetters("user", ["currentUser"])
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
