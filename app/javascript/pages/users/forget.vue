<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="false"
        dark
        text
        height="48"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
        Восстановление пароля
      </v-btn>
    </template>
    <v-card>
      <v-app-bar>
        <v-toolbar-title>
          Восстановление пароля
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$emit('clear-forget')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Введите свой email"
              required
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          class="mr-4"
          @click="restore"
        >
          Восстановить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      email: '',
      dialog: false,
      emailRules: [
        v => !!v || 'Пожалуйста,заполните электронную почту.',
      ],
    }
  },

  watch: {
    showDialog: function(val) {
      this.dialog = val
    }
  },

  methods: {
    restore: function() {
      const params = {
        email: this.email
      }
      this.$api.restorePassword(params).then((response) => {
        this.$emit('clear-forget')
        this.dialog = false
        this.$eventBus.$emit('show-flash', { type: 'info', text: response })
        this.$router.push('/').catch(() => {})
      }).catch((error) => {
      })
    },

    ...mapActions("user", ["setUser"])
  }
}
</script>
