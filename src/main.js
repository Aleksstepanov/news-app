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

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("fetchUser", firebase.auth().currentUser);
      } else {
        this.$store.dispatch("fetchUser", null);
      }
    });
  },
  render: (h) => h(App),
}).$mount("#app");
