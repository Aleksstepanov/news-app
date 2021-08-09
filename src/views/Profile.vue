<template>
  <b-card title="User Profile:">
    <b-card-text>
      <b-list-group>
        <b-list-group-item
          >User name: {{ getUserProfile.displayName }}</b-list-group-item
        >
        <b-list-group-item>email: {{ getUserProfile.email }}</b-list-group-item>
      </b-list-group>
    </b-card-text>

    <b-button to="/" variant="primary">Back to news list</b-button>
  </b-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",

  computed: {
    ...mapGetters(["getUserProfile"]),
  },
};
</script>

<style></style>
