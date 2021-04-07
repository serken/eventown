<template>
  <v-app>
    <main-header />

    <!-- Sizes your content based upon application components -->
    <v-main>

      <FlashMessage :position="'top right'" />
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
      this.$eventBus.$on('show-flash', this.showFlash)
    },

    methods: {
      toggleLeft: function() {
        this.showLeftPanel = !this.showLeftPanel
      },

      toggleRight: function() {
        this.showRightPanel = !this.showRightPanel
      },

      showFlash: function(flash) {
        this.flashMessage.show({
          status: flash.type,
          time: 5000,
          clickable: false,
          icon: "icon",
          blockClass: `notifications`,
          message: flash.text
        })
      }
    }

  }
</script>
<style lang="sass">
  .v-main
    padding-top: 100px !important
  .notifications
    z-index: 9999
</style>
