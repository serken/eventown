<template>
  <v-app>
    <v-navigation-drawer app v-show="showLeftPanel">
      <left-menu />
    </v-navigation-drawer>
    <v-navigation-drawer app right v-show="showRightPanel">
      <right-menu />
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
  import LeftMenu from "components/left_menu"
  import RightMenu from "components/right_menu"
  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
      "main-header": Header,
      "left-menu": LeftMenu,
      "right-menu": RightMenu
    },

    data: function() {
      return {
        showLeftPanel: false,
        showRightPanel: false
      }
    },

    mounted: function() {
      this.$eventBus.$on('toggle-right', this.toggleRight)
      this.$eventBus.$on('toggle-left', this.toggleLeft)
    },

    methods: {
      toggleLeft: function() {
        this.showLeftPanel = !this.showLeftPanel
      },

      toggleRight: function() {
        this.showRightPanel = !this.showRightPanel
      }
    }

  }
</script>
<style lang="sass">
  .v-main
    padding-top: 100px !important
</style>
