import newsApi from "@/config/newsApi.config.js";

const state = {
  newsList: [],
};
const actions = {
  async fetchNewsList({ commit }, payload) {
    const url = `${newsApi.url}q=${payload.q}${
      payload.from ? "&from=" + payload.from : ""
    }${payload.to ? "&to=" + payload.to : ""}&sortBy=${payload.sortBy}&apiKey=${
      newsApi.apiKey
    }`;

    try {
      commit("setLoading", true);
      const res = await fetch(url);
      const news = await res.json();
      commit("setNewsList", news);
      commit("setFavoritesToList", false);
      commit("setInformation", { code: "success", message: "fetch news" });
      commit("setLoading", false);
    } catch (err) {
      commit("setError", err);
      throw new Error(err);
    }
  },
  addFavorite({ commit, dispatch }, payload) {
    commit("setArticlesFavorite", payload);
    dispatch("addMyFavoritesNews", state.newsList[payload]);
  },
  removeFavorite({ commit, dispatch }, payload) {
    commit("removeArticlesFavorite", payload);
    dispatch("removeFavoriteNews", state.newsList[payload]);
  },
};
const mutations = {
  setNewsList(state, val) {
    const { articles } = val;
    state.newsList = articles;
  },
  setFavoritesToList(state, val) {
    state.newsList.map((art) => Object.assign(art, { favorite: val }));
  },
  setArticlesFavorite(state, val) {
    state.newsList[val].favorite = true;
  },
  removeArticlesFavorite(state, val) {
    state.newsList[val].favorite = false;
  },
};
const getters = {
  getNewsList: (state) => state.newsList,
  getFavorites: (state) => {
    return state.newsList.map((art) => art.favorite);
  },
};

export default { state, actions, mutations, getters };
