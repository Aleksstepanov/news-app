<template>
  <Spiner v-if="getLoading" />
  <b-row v-else class="mr-0 ml-0">
    <transition>
      <FormFetch />
    </transition>
    <b-row class="mr-0 ml-0">
      <b-list-group>
        <b-list-group-item
          v-for="(article, index) in getNewsList"
          :key="article.source.id + article.source.name + Date.now()"
        >
          <b-card :title="article.title" :sub-title="article.author">
            <b-row class="d-flex justify-content-end icon-star"
              ><b-icon
                v-if="!getNewsList[index].favorite"
                @click="favoriteClick(index)"
                icon="star"
                class="h1"
              ></b-icon>
              <b-icon
                v-else
                icon="star-fill"
                variant="warning"
                class="h1"
              ></b-icon
            ></b-row>
            <b-row>
              <b-col
                ><b-card-text>{{ article.description }}</b-card-text></b-col
              >
              <b-col
                ><b-card-img-lazy :src="article.urlToImage"></b-card-img-lazy
              ></b-col>
            </b-row>
            <a :href="article.url" class="card-link">to source...</a>
          </b-card>
        </b-list-group-item>
      </b-list-group>
    </b-row>
  </b-row>
</template>

<script>
import FormFetch from "@/components/FormFetch.vue";
import Spiner from "@/components/Spiner.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",

  components: {
    FormFetch,
    Spiner,
  },

  methods: {
    ...mapActions(["addFavorite"]),
    favoriteClick(index) {
      this.addFavorite(index);
      console.log(this.getNewsList);
    },
  },

  computed: {
    ...mapGetters(["getNewsList", "getLoading", "getFavoriteList"]),
    favoriteList() {
      return this.getFavoriteList.map((art) => art.favorite);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-star {
  cursor: pointer;
}
</style>
