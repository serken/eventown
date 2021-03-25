<template>
  <div>
    <v-btn
      text
      height="48"
      @click="close"
    >
      закрыть
    </v-btn>
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
