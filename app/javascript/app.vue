<template>
  <v-app>
    <v-navigation-drawer app v-if="false">
      <!-- -->
    </v-navigation-drawer>
    <main-header />

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
  import Header from "components/header"
  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
      "main-header": Header
    },

  }
</script>
<style lang="sass">
  .v-main
    padding-top: 100px !important
</style>
