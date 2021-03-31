<template>
  <div>
    <v-btn
      text
      height="48"
      @click="close"
    >
      закрыть
    </v-btn>
    <br />
    Приветствую, {{currentUser.firstName || currentUser.email}}
    <v-btn
      text
      height="48"
      @click="toAdmin"
    >
      Admin
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
