<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {

  data: function() {
    return {
      users: [],
      search: ''
    }
  },

  computed: {
    headers: function() {
      return this.users.length > 0 ? Object.keys(this.users[0]) : []
    }
  },

  methods: {
    fetchData: function() {
      this.$api.fetchUsers().then((data) => {
        this.users = data
      })
    }
  }
}


</script>
