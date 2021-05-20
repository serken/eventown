<template>
  <div>
    <v-tabs>
      <v-tab to="/admin/users">Users</v-tab>
      <v-tab to="/admin/events">Events</v-tab>
      <v-tab to="/admin/companies">Companies</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
  export default {

  }
</script>
