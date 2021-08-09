<template>
  <BContainer>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ getUserProfile.displayName }}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOutClickHandler()"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </BContainer>
</template>

<script>
import { BContainer } from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    BContainer,
  },

  computed: {
    ...mapGetters(["getUserProfile"]),
  },

  methods: {
    ...mapActions(["exit"]),
    signOutClickHandler() {
      this.exit();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss"></style>
