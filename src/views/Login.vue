<template>
  <b-form @submit.prevent="loginClickHandler()" :style="'width: 400px'">
    <b-form-group
      id="email-group"
      label="Email Adress:"
      label-for="email"
      description="Enter email adress"
    >
      <b-form-input
        id="email"
        type="email"
        placeholder="Enter email"
        v-model="form.email"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="password-group"
      label="Password"
      label-for="email"
      description="Enter password"
    >
      <b-form-input
        id="password"
        type="password"
        v-model="form.password"
        required
      ></b-form-input>
    </b-form-group>
    <b-row class="ml-0 mr-0 mb-2">
      <b-button variant="primary" type="submit">Login</b-button>
    </b-row>
    <b-row class="ml-0 mr-0">
      <router-link to="/register">Register</router-link>
    </b-row>
  </b-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      user: null,
    };
  },

  methods: {
    ...mapActions(["login"]),
    async loginClickHandler() {
      await this.login(this.form);
      if (this.getUserProfile) {
        this.user = this.getUserProfile;
        this.$router.push("/");
      }
    },
  },

  computed: {
    ...mapGetters(["getUserProfile"]),
  },
};
</script>

<style></style>
