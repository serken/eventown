<template>
  <v-col>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Проводим индексацию организаций, подождите
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <card v-for="company in getCompanies" :company="company" :key="company.id"/>
    </v-row>
  </v-col>
</template>

<script>
  import companyCard from "../../components/companyCard"

  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
      card: companyCard
    },

    data: function() {
      return {
        dialog: false,
      }
    },

    mounted: function() {
      this.fetchCompanies()
    },

    methods: {
      fetchCompanies: function() {
        this.$api.fetchCompanies().then((data) => {
          this.setCompanies(data.companies)
        })
      },

      ...mapActions("companies", ["setCompanies"])
    },

    computed: {
      ...mapGetters("companies", ["getCompanies"])
    },

    watch: {
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
