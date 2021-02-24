<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          name="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          name="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  methods: {
    async onSubmit(e) {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      if (!email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!password) {
        alert('Требуется ввести пароль');
        return;
      }

      try {
        const result = await login(email, password);
        // status code is present only in case of errors
        if (result.statusCode) {
          alert(result.message);
        } else {
          alert(result.fullname);
        }
      } catch (e) {
        alert('Network error');
      }
    },
  },
};
</script>

<style scoped></style>
