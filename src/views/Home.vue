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
            <b-row class="d-flex justify-content-end icon-star">
              <b-icon
                @click="favoriteClick(index)"
                :icon="'star-fill'"
                :variant="
                  favorieList.some((el) => el === index) ? 'warning' : ''
                "
                class="h1"
              ></b-icon>
            </b-row>
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

  data() {
    return {
      favorieList: [],
    };
  },

  components: {
    FormFetch,
    Spiner,
  },

  methods: {
    ...mapActions(["addFavorite", "removeFavorite"]),
    favoriteClick(index) {
      if (this.favorieList.some((icon) => icon === index)) {
        this.favorieList = this.favorieList.filter((icon) => icon != index);
        this.removeFavorite(index);
      } else {
        this.favorieList.push(index);
        this.addFavorite(index);
      }
    },
  },

  computed: {
    ...mapGetters(["getNewsList", "getLoading", "getNewsList"]),
  },

  mounted() {
    this.favorieList = [];
    this.getNewsList
      .map((news) => news.favorite)
      .forEach((el, idx) => (el ? this.favorieList.push(idx) : null));
  },
};
</script>

<style lang="scss" scoped>
.icon-star {
  cursor: pointer;
}
</style>
