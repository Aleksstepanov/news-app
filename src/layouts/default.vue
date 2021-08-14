<template>
  <BContainer>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#"><Logo /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ getUserProfile.displayName }}</em>
            </template>
            <b-dropdown-item to="/profile"
              ><b-icon icon="person-fill" class="mr-2"></b-icon
              >Profile</b-dropdown-item
            >
            <b-dropdown-item to="/mynewslist"
              ><b-icon icon="book" class="mr-2"></b-icon> My news
              list</b-dropdown-item
            >
            <b-dropdown-item @click="signOutClickHandler()"
              ><b-icon icon="power" class="mr-2"></b-icon> Sign
              Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
    <Toasts :text="'You are logged out'" />
  </BContainer>
</template>

<script>
import Toasts from "@/components/Toasts.vue";
import Logo from "@/components/Logo.vue";
import { BContainer } from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    BContainer,
    Toasts,
    Logo,
  },

  computed: {
    ...mapGetters(["getUserProfile"]),
  },

  methods: {
    ...mapActions(["exit"]),
    signOutClickHandler() {
      this.$bvToast.show("my-toast");
      this.exit();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss"></style>
