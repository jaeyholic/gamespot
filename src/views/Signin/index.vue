<template>
  <div class="container">
    <div class="signin_container">
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <div class="input_field">
          <label>Email</label>
          <input type="email" v-model="formData.email">
        </div>
        <div class="input_field">
          <label>Password</label>
          <input type="paswword" v-model="formData.password">
        </div>
        <button type="submit">Signin</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          email: 'reactredux2001@gmail.com',
          password: 'T0020201070'
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('admin/signIn', this.formData)
      }
    }
  }
</script>

<style scoped>

</style>