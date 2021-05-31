<template>
  <carousel :scrollPerPage="true" :autoplay="true" :perPage="3" :navigationEnabled="true">
    <slide v-for="object in objects" :key="object.id">
      <card :event="object"/>
    </slide>
  </carousel>
</template>

<script>
  import card from "./card"
  import filters from "./filters"

  import { mapActions, mapState, mapGetters } from "vuex"
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    components: {
      card: card,
      filters: filters,
      carousel: Carousel,
      slide: Slide
    },

    props: {
      objects: {
        type: Array,
        default: () => []
      }
    }


  }
</script>
