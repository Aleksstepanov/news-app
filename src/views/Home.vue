<template>
  <b-row>
    <b-col sm="auto">
      <b-button @click="btnClickHandler()">Click</b-button>
    </b-col>
    <b-col>
      <ul class="home__list">
        <li
          class="home__item"
          v-for="(value, index) in getNewsList"
          :key="value.source.id + index"
        >
          <p>{{ value.author }}</p>
          <p>{{ value.title }}</p>
          <p>{{ value.description }}</p>
          <p>{{ value.url }}</p>
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import newsApi from "@/config/newsApi.config.js";

export default {
  name: "Home",

  components: {},

  data() {
    return {
      newsList: {},
    };
  },

  methods: {
    async btnClickHandler() {
      const res = await fetch(newsApi);
      const data = await res.json();
      this.newsList = data;
    },
  },

  computed: {
    getNewsList() {
      return this.newsList.articles;
    },
  },
};
</script>
