<template>
  <Spiner v-if="getLoading" />
  <b-form
    v-else
    @submit.prevent="RegisterClickHandler()"
    :style="'width: 400px'"
  >
    <b-form-group
      id="firstName-group"
      label="First Name:"
      label-for="firstName"
      description="Enter your first name"
    >
      <b-form-input
        id="firstName"
        type="text"
        placeholder="Enter first name"
        v-model="form.firstName"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="lastName-group"
      label="Last Name:"
      label-for="lastName"
      description="Enter your last name"
    >
      <b-form-input
        id="lastName"
        type="text"
        placeholder="Enter last name"
        v-model="form.lastName"
        required
      ></b-form-input>
    </b-form-group>

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
      <b-button variant="primary" type="submit">Register</b-button>
    </b-row>
    <b-row class="ml-0 mr-0">
      <router-link to="/login">Back</router-link>
    </b-row>
  </b-form>
</template>

<script>
import Spiner from "@/components/Spiner.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Register",

  components: {
    Spiner,
  },

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },

  computed: {
    ...mapGetters(["getLoading", "getUserProfile"]),
  },

  methods: {
    ...mapActions(["register"]),

    async RegisterClickHandler() {
      await this.register(this.form).then(() => {
        if (this.getUserProfile) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style></style>
