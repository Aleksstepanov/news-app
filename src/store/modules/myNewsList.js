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
    const idx = getters.getNewsList.findIndex(
      (news) => news.title === payload.title
    );
    console.log(idx);
    if (idx >= 0) {
      commit("removeArticlesFavorite", idx);
    }
    try {
      firebase.database().ref(`users/${uid}/mynews/${key}`).remove();
    } catch (err) {
      console.log(err);
    }
  },
  async loadFavoriteNews({ commit, getters }) {
    const uid = getters.getUidUser;
    try {
      commit("setLoading", true);
      firebase
        .database()
        .ref(`users/${uid}/mynews/`)
        .on("value", async (snapshot) => {
          const data = await snapshot.val();
          commit("setNewsListFavorites", data);
          commit("setLoading", false);
          commit("setInformation", {
            code: "success",
            message: "firbase dataloading",
          });
          commit("setError", null);
        });
    } catch (error) {
      commit("setError", error);
      throw new Error(error);
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
  setNewsListFavorites(state, val) {
    if (val) {
      const newList = Object.values(val);
      state.newsListFavorites = newList;
    } else {
      state.newsListFavorites = [];
    }
  },
};
const getters = {
  getMyNewsListFavoriotes: (state) => state.newsListFavorites,
};

export default { state, actions, mutations, getters };
