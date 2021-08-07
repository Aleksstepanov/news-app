import newsApi from "@/config/newsApi.config.js";

const state = {
  newsList: "",
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
      commit("setInformation", { code: "success", message: "fetch news" });
      commit("setLoading", false);
    } catch (err) {
      commit("setError", err);
    }
  },
};
const mutations = {
  setNewsList(state, val) {
    state.newsList = val;
    console.log(val);
  },
};
const getters = {
  getNewsList: (state) => state.newsList,
};

export default { state, actions, mutations, getters };
