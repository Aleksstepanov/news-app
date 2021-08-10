import Vue from "vue";
import Vuex from "vuex";
import news from "./modules/news";
import auth from "./modules/auth";
import mynewsList from "./modules/myNewsList";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    loadnig: false,
    information: {},
  },

  mutations: {
    setError(state, val) {
      state.error = val;
    },
    setLoading(state, val) {
      state.loadnig = val;
    },
    setInformation(state, val) {
      state.information = Object.assign({}, state.information, val);
    },
  },
  actions: {},
  getters: {
    getError: (state) => state.error,
    getLoading: (state) => state.loadnig,
    getInformation: (state) => state.information,
  },
  modules: {
    news,
    auth,
    mynewsList,
  },
});
