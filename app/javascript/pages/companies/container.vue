<template>
  <div>
    <div>
      <v-row>
        <v-col left>
          <v-img
            :src="company.pic"
            height="250"
            contain
          >

          </v-img>
        </v-col>
        <v-col>
          <v-list>
            <v-list-item>
              Название: {{ company.name }}
            </v-list-item>
            <v-list-item>
              Ссылка на организацию: {{ company.remote_url }}
            </v-list-item>
            <v-list-item>
              Адрес: {{ company.address }}
            </v-list-item>
            <v-list-item>
              Телефон: {{ company.phone }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-tabs>
      <v-tab :to="`/companies/${company.id}/about`">Об Организации</v-tab>
      <v-tab :to="`/companies/${company.id}/events`">События</v-tab>
      <v-tab :to="`/companies/${company.id}/comments`">Комментарии</v-tab>
      <v-tab v-if="isMyCompany" :to="`/companies/${company.id}/edit`">Редактировать Организацию</v-tab>
    </v-tabs>
    <router-view :company="company" @update-company="updateCompany"/>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex"

  export default {
    components: {
    },

    data: function() {
      return {
        page: 1,
        perPage: 10,
        total: null,
        dialog: false,
        filters: [],
        date_filter: [],
        company: {}
      }
    },

    mounted: function() {
      this.fetchCompany()
    },

    computed: {
      isMyCompany: function() {
        return this.currentUser && this.currentUser.id == this.company.user_id
      },

      ...mapGetters("user", ["currentUser"])
    },

    methods: {
      fetchCompany: function() {
        this.$api.fetchCompany(this.$router.currentRoute.params.id).then((company) => {
          this.company = company
        })
      },

      updateCompany: function(company) {
        this.company = company
      }
    }
  }
</script>

<style lang="sass">
.flex
  display: flex
  flex-direction: row
</style>
