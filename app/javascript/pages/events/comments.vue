<template>
  <div>
    <v-text-field v-model="message">
    </v-text-field>
    <v-btn @click="addComment">
      Добавить комментарий
    </v-btn>
    <div v-for="comment in event.comments">

      <div>
        <v-icon @click="deleteComment(comment.id)" >
          mdi-close
        </v-icon>
        {{comment.message}}
      </div>
    </div>
  </div>
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

    components: {
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
