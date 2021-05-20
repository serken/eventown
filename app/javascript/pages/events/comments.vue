<template>
  <div>
    <v-card>
      <v-textarea class="ma-4" v-model="message" placeholder="Комментарий...">
      </v-textarea>
      <v-btn class="ma-4" @click="addComment">
        Добавить комментарий
      </v-btn>
    </v-card>
    <template v-for="comment in event.comments">
      <comment :comment="comment" @delete-comment="deleteComment"/>
    </template>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex"
  import Comment from "./../../components/comment"

  export default {

    props: {
      event: {
        type: Object,
        default: () => {}
      }
    },

    components: {
      'comment': Comment
    },

    data: function() {
      return {
        message: ''
      }
    },

    computed: {
      ...mapGetters("user", ["currentUser"])
    },

    methods: {
      addComment: function() {
        if(!this.currentUser) {
          this.$eventBus.$emit('show-sign-in-form')
          return
        }

        this.$api.addEventComment(this.event.id, this.message).then((data) => {
          this.message = ''
          this.$emit('update-event', data)
        })
      },

      deleteComment: function(id) {
        this.$api.deleteEventComment(this.event.id, id).then((data) => {
          this.$emit('update-event', data)
        })
      }
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
