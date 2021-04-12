<template>
  <div>
    <v-textarea v-model="message" placeholder="Комментарий...">
    </v-textarea>
    <v-btn @click="addComment">
      Добавить комментарий
    </v-btn>
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

    methods: {
      addComment: function() {
        this.$api.addEventComment(this.event.id, this.message).then((data) => {
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
