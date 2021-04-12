<template>
  <v-card>
    <v-app-bar>
      <v-toolbar-title>
        Восстановление пароля
      </v-toolbar-title>
    </v-app-bar>
    <v-card-text>
      <v-container>
        <v-form
            v-model="valid"
            @submit.prevent="updatePassword"
          >
          <v-row>
            <v-text-field
              v-model="password"
              :error-messages="errors.password"
              label="Введите новый пароль"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="confirm"
              label="Подтвердите пароль"
              type="password"
              :rules="confirmPasswordRules"
              required
            ></v-text-field>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              Обновить пароль
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
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
      valid: false,
      password: '',
      confirm: '',
      errors: {},
      passwordRules: [
        (value) => !!value || 'Пожалуйста, заполните пароль.',
        (value) => (value && value.length >= 8 ) || 'минимум 8 символов',
        (value) =>
          this.confirm.length > 0 && value === this.confirm || 'Подтверждение пароля не совпадает.',
      ],
      confirmPasswordRules: [
        (value) => !!value || 'Пожалуйста, заполните подтверждение пароля.',
        (value) =>
          value === this.password || 'Подтверждение пароля не совпадает.',
      ],
    }
  },

  mounted: function() {

  },

  methods: {
    updatePassword: function() {
      const params = {
        password: this.password,
        token: this.$router.currentRoute.query.token
      }
      this.$api.updatePassword(params).then((user) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Пароль успешно обновлен' })
        this.$router.push('/').catch(() => {})
      }).catch((error) => {
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.errors })
      })
    }
  }
}
</script>
