<template>
  <div>
    <v-app-bar
      app
      absolute
      color="#6A76AB"
      dark
      dense
      fixed
      height="48"
      shrink-on-scrol
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="toggleLeft"></v-app-bar-nav-icon>

      <v-app-bar-title> <v-btn text @click="$router.push('/')">evenTown </v-btn></v-app-bar-title>

      <v-spacer></v-spacer>

      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <v-btn
        text
        height="48"
      >
        Черноморск
      </v-btn>
      <sign-in
        v-if="!signedIn"
        :show-dialog="signInDialog"
        @sign-up="signUp"
        @clear-sign-in="clearSignIn"
      />
      <sign-up
        v-if="!signedIn"
        :show-dialog="signUpDialog"
        @sign-in="signIn"
        @clear-sign-up="clearSignUp"
      />
      <v-btn
        v-else
        text
        height="48"
        @click="toggleRight"
      >
        <v-icon>mdi-account</v-icon>
        Профиль
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="showLeftPanel"
      app
      absolute
      temporary
    >
      <left-menu />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="showRightPanel"
      app
      absolute
      temporary
      right
    >
      <right-menu />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import SignIn from "../pages/users/sign_in"
import SignUp from "../pages/users/register"

import LeftMenu from "components/left_menu"
import RightMenu from "components/right_menu"

export default {
  components: {
    "sign-in": SignIn,
    "sign-up": SignUp,
    "left-menu": LeftMenu,
    "right-menu": RightMenu
  },

  data: function() {
    return {
      signInDialog: null,
      signUpDialog: null,
      showLeftPanel: false,
      showRightPanel: false
    }
  },


  mounted: function() {
    this.$eventBus.$on('sign-out', this.signOutUser)
    this.$eventBus.$on('toggle-right', this.toggleRight)
    this.$eventBus.$on('toggle-left', this.toggleLeft)
  },

  computed: {
    signedIn: function() {
      return this.currentUser
    },

    ...mapGetters("user", ["currentUser"])
  },

  methods: {
    toggleLeft: function() {
      this.showLeftPanel = !this.showLeftPanel
    },

    toggleRight: function() {
      this.showRightPanel = !this.showRightPanel
    },

    signOutUser: function() {
      this.$eventBus.$emit('show-flash', { type: 'info', text: 'Пока пока' })
      this.signOut()
    },

    signIn: function() {
      this.signInDialog = true
      this.signUpDialog = false
    },

    signUp: function() {
      this.signInDialog = false
      this.signUpDialog = true
    },

    clearSignUp: function() {
      this.signUpDialog = null
    },

    clearSignIn: function() {
      this.signInDialog = null
    },

    ...mapActions("user", ["signOut"])
  }
}
</script>
