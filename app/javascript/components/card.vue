<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="`${event.pic}`"
    ></v-img>
    <v-card-text>
      {{event.type}}
    </v-card-text>
    <v-card-text v-if="!event.active">
      <v-chip
        class="ma-2"
      >Неактивен
      </v-chip>
    </v-card-text>
    <v-card-title>{{event.title}}</v-card-title>

    <v-card-text>

      <div class="my-4 subtitle-1">
        Цена: $ {{event.cost}}
      </div>
      <div class="my-4 subtitle-1">
        Город: {{event.location}}
      </div>

      <div>{{event.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        column
      >
        <v-chip>{{formatedDate}}</v-chip>
        <v-chip>{{event.start_time}}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        +{{event.phone_number}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: {
      event: {
        type: Object,
        default: () => {}
      }
    },

    data: function() {
      return {
      }
    },

    computed: {
      formatedDate: function() {
        console.log(this.event.start_date)
        return this.$moment(this.event.start_date).format("D MMMM YYYY")
      }
    }
  }
</script>
