<template>
  <div>
    <v-app-bar>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <br />
    Приветствую, {{currentUser.firstName || currentUser.email}}
    <v-btn
      text
      height="48"
      @click="toAdmin"
    >
      Admin
    </v-btn>

    <v-btn text @click="createEvent">
      Добавить событие
    </v-btn>

    <v-btn
      text
      height="48"
      @click="signOut"
    >
      Выйти
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },

  methods: {
    createEvent: function() {
      this.$router.push('/create_event')
    },

    close: function() {
      this.$eventBus.$emit('toggle-right')
    },

    signOut: function() {
      this.close()
      this.$eventBus.$emit('sign-out')
    },

    toAdmin: function() {
      this.$router.push({path: '/admin/users'})
    }
  }
}
</script>
