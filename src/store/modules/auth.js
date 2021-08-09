import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
      const user = userCredential.user;
      dispatch("fetchUser", user);
      commit("setInformation", { code: "success", message: "user login!" });
      commit("setError", null);
      commit("setLoading", false);
    } catch (err) {
      commit("setError", err);
      commit("setUserProfile", null);
      commit("setLoading", false);
      throw new Error(err);
    }
  },

  exit() {
    firebase.auth().signOut();
  },

  async register({ commit, dispatch }, payload) {
    commit("setLoading", true);
    const db = firebase.database();

    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((data) => {
        data.user.updateProfile({
          displayName: payload.firstName + " " + payload.lastName,
        });
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        return user;
      })
      .then((user) => {
        db.ref(`/users/${user.uid}`).set({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        });
        return user;
      })
      .then((user) => {
        dispatch("fetchUser", user);
        commit("setInformation", {
          code: "success",
          message: "register new User!",
        });
        commit("setError", null);
        commit("setLoading", false);
      })
      .catch((err) => {
        commit("setError", err);
        commit("setUserProfile", null);
        commit("setInformation", {
          code: "error",
          message: "error in register",
        });
        commit("setLoading", false);
        throw new Error(err);
      });
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
