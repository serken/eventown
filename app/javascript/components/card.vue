<template>
  <div class="event-card">
    <div class="event-img-block">
      <img
        contain
        class="event-img"
        height="460"
        width="353"
        :src="`${image}`"
      >
      </img>
    </div>
    <div class="event-content">
      <div>

      </div>
      <div class="title">
        {{ event.title }}
      </div>
      <div>
        {{ event.start_time }} {{ formatedDate }}
      </div>
      <div>
        <v-btn
          @mousedown.stop
          outlined
          rounded
          color="white"
          @click="$router.push(`/events/${event.id}/about`)"
        >
          Подробнее
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          v-if="isMyEvent"
          outline
          icon
          outlined
          rounded
          color="white"
          @click.stop
          :to="`/events/${event.id}/edit`"
          @mousedown.stop
        >
          <v-icon>
            mdi-pencil-outline
          </v-icon>
        </v-btn>
        <v-btn
          icon
          outlined
          rounded
          color="white"
          v-if="currentUser"
          @click.stop="makeFavorite"
          @mousedown.stop
        >
          <v-icon>{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
        </v-btn>

        <v-btn
          icon
          outlined
          rounded
          color="white"
          @click.stop
          @mousedown.stop
        >
          <v-icon>
            mdi-share-outline
          </v-icon>
        </v-btn>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from "vuex"

  const IMG = 'https://mizez.com/custom/mizez/img/general/no-image-available.png'
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
        return this.currentUser && this.currentUser.favorite_events && this.currentUser.favorite_events.map(i => i.favoritable_id).includes(this.event.id)
      },

      isMyEvent: function() {
        return this.currentUser && this.currentUser.events && this.currentUser.events.map(i => i.id).includes(this.event.id)
      },

      image: function() {
        return this.event.pic ? this.event.pic : IMG
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
.event-card
  margin: 5px
  width: 353px
  height: 460px
  position: relative
  border-radius: 10px
  overflow: hidden
  &:hover
    .event-img
      transform: scale(1.1)
  .event-content
    padding: 40px 26px
    flex-wrap: wrap
    justify-content: center !important
    align-items: center !important
    display: flex
    position: absolute
    color: #dddddd !important
    bottom: 0
    left: 0
    width: 100%
    z-index: 2
    text-align: center
    div
      width: 100%
      margin-top: 10px

      &.title
        font-size: 28px !important


  .event-img-block
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    transition: all 0.6s ease
    overflow: hidden

    .event-img
      width: 100%
      height: 100%
      object-fit: cover
      transition: all 0.6s ease

    &::after
      content: ''
      position: absolute
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.91) 58%)
      bottom: 0
      left: 0
      right: 0
      top: 0
      opacity: 0.7
</style>
