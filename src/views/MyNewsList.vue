<template>
  <b-row class="mr-0 ml-0">
    <router-link to="/">Back to news list</router-link>
    <b-list-group>
      <b-list-group-item
        v-for="article in getMyNewsListFavoriotes"
        :key="article.source.id + article.source.name + Date.now()"
      >
        <b-card :title="article.title" :sub-title="article.author">
          <b-row>
            <b-col
              ><b-card-text>{{ article.description }}</b-card-text></b-col
            >
            <b-col
              ><b-card-img-lazy :src="article.urlToImage"></b-card-img-lazy
            ></b-col>
          </b-row>
          <b-row class="d-flex justify-content-between mt-3">
            <a :href="article.url" class="card-link ml-2">to source...</a>
            <b-button
              @click="removeFavoriteItemClickHandler(article)"
              variant="danger"
              class="mr-2"
              >Remove</b-button
            >
          </b-row>
        </b-card>
      </b-list-group-item>
    </b-list-group>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MyNewsList",

  methods: {
    ...mapActions(["loadFavoriteNews", "removeFavoriteNews"]),
    removeFavoriteItemClickHandler(art) {
      this.removeFavoriteNews(art);
    },
  },

  computed: {
    ...mapGetters(["getMyNewsListFavoriotes"]),
  },

  async created() {
    await this.loadFavoriteNews();
  },
};
</script>

<style></style>
