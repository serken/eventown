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
      :src="`${event.pic}?${number}`"
    ></v-img>
    <v-card-text>
      {{event.type}}
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
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>{{this.$moment(event.start_date)}}</v-chip>

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
        number: Math.random()
      }
    }
  }
</script>
