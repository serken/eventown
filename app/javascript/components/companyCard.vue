<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto my-6 company-card"
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      max-width="250"
      shaped
      @click="$router.push(`/companies/${company.id}/about`)"
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
        :src="`${company.pic}`"
        :lazy-src="'https://mizez.com/custom/mizez/img/general/no-image-available.png'"
      >
      </v-img>

      <v-card-text>
        {{ company.name }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-chip
          v-if="!company.active"
          class="ma-2"
        >
          Неактивен
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isMyCompany"
          icon
          @click.stop
          :to="`/companies/${company.id}/edit`"
          @mousedown.stop
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
          @click.stop
          @mousedown.stop
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
      company: {
        type: Object,
        default: () => {}
      }
    },

    data: function() {
      return {
      }
    },

    computed: {
      isFavorite: function() {
        return this.currentUser && this.currentUser.favorite_companies && this.currentUser.favorite_companies.map(i => i.favoritable_id).includes(this.company.id)
      },

      isMyCompany: function() {
        return this.currentUser && this.currentUser.id == this.company.user_id
      },

      ...mapGetters("user", ["currentUser"])
    },

    methods: {
      makeFavorite: function() {
        this.$api.makeFavorite(this.company.id).then((data) => {
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
.company-card
  flex: 1 0 21%
  margin: 5px
</style>
