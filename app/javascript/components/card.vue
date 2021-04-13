<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto my-12"
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      max-width="300"
      @click="$router.push(`/events/${event.id}/about`)"
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
        contain
        :src="`${event.pic}`"
        :lazy-src="'https://mizez.com/custom/mizez/img/general/no-image-available.png'"
      >
      </v-img>

      <v-card-text>
        <div>{{event.type}}</div>
        <p class="display-1 text--primary">
          {{event.title}}
        </p>
        <p>Цена: $ {{event.cost}}</p>
        <div class="text--primary">

        </div>
        <span class="text-h5">
          {{event.start_time}}
        </span>
        <br>
        {{formatedDate}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-chip
          v-if="!event.active"
          class="ma-2"
        >
          Неактивен
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isMyEvent"
          icon
          :to="`/events/${event.id}/edit`"
        >
          <v-icon>
            mdi-pencil-outline
          </v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="currentUser"
          @click.stop="makeFavorite"
          @mousedown.stop
        >
          <v-icon>{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
        </v-btn>

        <v-btn
          icon
        >
          <v-icon>
            mdi-share-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
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

      isMyEvent: function() {
        return this.currentUser && this.currentUser.events.map(i => i.id).includes(this.event.id)
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

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
