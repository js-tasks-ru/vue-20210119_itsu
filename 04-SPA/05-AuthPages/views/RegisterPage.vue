<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input name="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input name="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input name="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input name="passwordRepeated" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input name="agreedWithConditions" type="checkbox" /> Я согласен с
        условиями <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  methods: {
    async onSubmit(e) {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const fullname = formData.get('fullname');
      const password = formData.get('password');
      const passwordRepeated = formData.get('passwordRepeated');
      const agreedWithConditions = formData.get('agreedWithConditions');
      if (!email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!fullname) {
        alert('Требуется ввести полное имя');
        return;
      }
      if (!password) {
        alert('Требуется ввести пароль');
        return;
      }
      if (password !== passwordRepeated) {
        alert('Пароли не совпадают');
        return;
      }
      if (!agreedWithConditions) {
        alert('Требуется согласиться с условиями');
        return;
      }

      try {
        const result = await register(email, fullname, password);
        // status code is present only in case of errors
        if (result.statusCode) {
          alert(result.message);
        } else {
          alert(result.id);
        }
      } catch (e) {
        alert('Network error');
      }
    },
  },
};
</script>

<style scoped></style>
