<template>
  <Spiner v-if="getLoading" />
  <b-form v-else @submit.prevent="loginClickHandler()" :style="'width: 400px'">
    <h1>Authorization</h1>
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
import Spiner from "@/components/Spiner.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",

  components: {
    Spiner,
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions(["login"]),
    async loginClickHandler() {
      await this.login(this.form).then(() => {
        if (this.getUserProfile) {
          this.$router.push("/");
        }
      });
    },
  },

  computed: {
    ...mapGetters(["getUserProfile", "getLoading"]),
  },
};
</script>

<style></style>
