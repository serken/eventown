<template>
  <div>
    <v-tabs>
      <v-tab to="/profile/edit">Редактировать профиль</v-tab>
      <v-tab to="/profile/my_events">Мои события</v-tab>
      <v-tab to="/profile/favorites">Избранные события</v-tab>

      <v-tab v-if="currentUser.has_company" :to="`/profile/edit_company`">Редактировать Организацию</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
}
</script>
