import newsApi from "@/config/newsApi.config.js";

const state = {
  newsList: [],
  newsListFavorites: [],
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
    }
  },
  addFavorite({ commit }, payload) {
    commit("setArticlesFavorite", payload);
  },
};
const mutations = {
  setNewsList(state, val) {
    const { articles } = val;
    // articles.map((art) => Object.assign({}, art, { favorite: false }));
    // val.articles = articles;
    state.newsList = articles;
  },
  setFavoritesToList(state, val) {
    state.newsList.map((art) => Object.assign(art, { favorite: val }));
  },
  setArticlesFavorite(state, val) {
    state.newsListFavorites.push(state.newsList[val]);
    state.newsList.splice(val, 1);
    state.newsListFavorites[state.newsListFavorites.length - 1].favorite = true;
  },
};
const getters = {
  getNewsList: (state) =>
    state.newsList.concat(state.newsListFavorites).reverse(),
};

export default { state, actions, mutations, getters };
