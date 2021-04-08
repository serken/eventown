<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
    :to="`/events/${event.id}`"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="`${event.pic}`"
    ></v-img>
    <v-card-text>
      {{event.type}}
    </v-card-text>
    <v-card-text v-if="!event.active">
      <v-chip
        class="ma-2"
      >Неактивен
      </v-chip>
    </v-card-text>
    <v-card-title>{{event.title}}

      <v-icon
        v-if="currentUser"
        @click="makeFavorite"
      >
        {{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
      </v-icon>
    </v-card-title>
    <v-card-text>

      <div class="my-4 subtitle-1">
        Цена: $ {{event.cost}}
      </div>
      <div class="my-4 subtitle-1">
        Город: {{event.location}}
      </div>

      <div>{{event.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="text-h5">
        {{event.start_time}}
      </span>
      <br>
      {{formatedDate}}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        +{{event.phone_number}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    props: {
      event: {
        type: Object,
        default: () => {}
      }
    },

    data: function() {
      return {
      }
    },

    computed: {
      formatedDate: function() {
        return this.$moment(this.event.start_date).format("dddd, D MMMM YYYY.")
      },

      isFavorite: function() {
        return this.currentUser.favorite_events.map(i => i.favoritable_id).includes(this.event.id)
      },

      ...mapGetters("user", ["currentUser"])
    },

    methods: {
      makeFavorite: function() {
        this.$api.makeFavorite(this.event.id).then((data) => {
          this.setUser(data)
        }).catch((error) => {

        })
      },
      ...mapActions("user", ["setUser"])
    }
  }
</script>
