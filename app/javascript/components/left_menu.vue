<template>
  <div>
    <v-app-bar>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  methods: {
    close: function() {
      this.$eventBus.$emit('toggle-left')
    }
  }
}
</script>
