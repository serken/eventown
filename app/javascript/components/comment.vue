<template>
  <v-card class="mx-auto mt-10">
    <v-card-text>{{comment.message}}</v-card-text>

    <v-card-actions>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar color="indigo">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title :to="`/users/${comment.user_id}`">{{comment.user_name}}</v-list-item-title>
          <v-list-item-subtitle v-html="comment.created_at"></v-list-item-subtitle>
        </v-list-item-content>
        <v-row
          align="center"
          justify="end"
        >
          <v-icon @click="$emit('delete-comment', comment.id)" >
            mdi-close
          </v-icon>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    isMyComment: function(){
      return this.currentUser.id === comment.user_id
    },

    ...mapGetters("user", ["currentUser"])
  },
}
</script>

<style lang="sass">

</style>
