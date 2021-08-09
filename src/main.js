import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase.config";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (!app) {
      app = new Vue({
        router,
        store,
        created() {
          this.$store.dispatch("fetchUser", user);
        },
        render: (h) => h(App),
      }).$mount("#app");
    } else {
      this.$router.push("/login");
    }
  }
});
