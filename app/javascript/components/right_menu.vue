<template>
  <div>
    <v-app-bar>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-list>
      <v-list-item v-if="currentUser">
        <v-list-item-title>Приветствую, {{currentUser.firstName || currentUser.email}}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="currentUser" @click="toAdmin">
        <v-list-item-title>В Админ панель</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="currentUser" to="/profile/edit">
        <v-list-item-title>Редактировать профиль</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="currentUser" to="/profile/favorites">
        <v-list-item-title>Избранные</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="currentUser && currentUser.is_org" to="/profile/my_events">
        <v-list-item-title>Мои События</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="currentUser && currentUser.is_org" @click="createEvent">
        <v-list-item-title>Добавить событие</v-list-item-title>
      </v-list-item>
      <v-list-item @click="signOut">
        <v-list-item-title>Выйти</v-list-item-title>
      </v-list-item>
    </v-list>
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
