import firebase from "firebase/app";
import "firebase/database";

const state = {
  newsListFavorites: [],
};
const actions = {
  addMyFavoritesNews({ commit, getters }, payload) {
    const uid = getters.getUidUser;
    try {
      const newKey = firebase.database().ref(`/users/${uid}`).push().key;
      commit("addMyNewsItem", { payload, newKey });
      firebase.database().ref(`/users/${uid}/mynews/${newKey}`).update(payload);
    } catch (err) {
      console.log(err);
    }
  },
  removeFavoriteNews({ commit, getters }, payload) {
    const uid = getters.getUidUser;
    const { key } = state.newsListFavorites.find(
      (news) => news.title === payload.title
    );
    commit("removeMyNewsItem", payload);
    try {
      firebase.database().ref(`users/${uid}/mynews/${key}`).remove();
    } catch (err) {
      console.log(err);
    }
  },
  async loadFavoriteNews({ commit, getters }) {
    const uid = getters.getUidUser;
    try {
      firebase
        .database()
        .ref(`users/${uid}`)
        .on("value", async (snapshot) => {
          commit("setLoading", true);
          const data = await snapshot.val();
          commit("setNewsListFavorites", data);
        })
        .then(() => {
          commit("setLoading", false);
          commit("setError", null);
          commit("SetInformation", {
            code: "success",
            message: "firebase loading data",
          });
        });
    } catch (err) {
      commit("setError", err);
      throw new Error(err);
    }
  },
};
const mutations = {
  addMyNewsItem(state, val) {
    const { payload, newKey } = val;
    payload.key = newKey;
    state.newsListFavorites.push(payload);
  },
  removeMyNewsItem(state, val) {
    state.newsListFavorites = state.newsListFavorites.filter(
      (news) => news.title != val.title
    );
  },
};
const getters = {};

export default { state, actions, mutations, getters };
