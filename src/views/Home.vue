<template>
  <Spiner v-if="getLoading" />
  <b-row v-else class="mr-0 ml-0">
    <FormFetch />
    <b-row class="mr-0 ml-0">
      <b-list-group>
        <b-list-group-item
          v-for="article in getNewsList.articles"
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
import { mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    FormFetch,
    Spiner,
  },

  methods: {},

  computed: {
    ...mapGetters(["getNewsList", "getLoading"]),
  },
};
</script>
