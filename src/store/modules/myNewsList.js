const state = {
  newsListFavorites: [],
};
const actions = {
  addMyFavoritesNews({ commit }, payload) {
    commit("addMyNewsItem", payload);
  },
  removeFavoriteNews({ commit }, payload) {
    commit("removeMyNewsItem", payload);
  },
};
const mutations = {
  addMyNewsItem(state, val) {
    state.newsListFavorites.push(val);
  },
  removeMyNewsItem(state, val) {
    state.newsListFavorites = state.newsListFavorites.filter(
      (news) => news.title != val.title
    );
  },
};
const getters = {};

export default { state, actions, mutations, getters };
