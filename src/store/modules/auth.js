import firebase from "firebase/app";
import "firebase/auth";

const state = {
  userProfile: "",
};
const actions = {
  async login({ commit, dispatch }, payload) {
    commit("setLoading", true);
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      const user = await userCredential.user;
      dispatch("fetchUser", user);
      commit("setInformation", { code: "success", message: "user login!" });
      commit("setError", null);
      commit("setLoading", false);
    } catch (err) {
      commit("setError", err);
      commit("setUserProfile", null);
      throw new Error(err);
    }
  },

  exit() {
    firebase.auth().signOut();
  },

  fetchUser({ commit }, payload) {
    commit("setUserProfile", payload);
  },
};
const mutations = {
  setUserProfile(state, val) {
    state.userProfile = val;
  },
};
const getters = {
  getUserProfile: (state) => state.userProfile,
};

export default { state, actions, mutations, getters };
