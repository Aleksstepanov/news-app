<template>
  <b-row class="mr-0 ml-0 mt-2 mb-2">
    <b-form @submit.prevent="submitClickHandler()">
      <b-row class="mr-0 ml-0">
        <b-form-group
          id="label-search"
          label="News topics:"
          label-for="search"
          class="w-50"
        >
          <b-form-input
            id="search"
            v-model="form.search"
            type="text"
            placeholder="Enter search target"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>
      <b-row class="mr-0 ml-0">
        <b-form-group
          class="w-50 mr-2"
          id="label-from"
          label="Date of first article:"
          label-for="from"
        >
          <b-form-datepicker id="from" v-model="form.from"></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="label-to"
          class="w-50"
          label="Date of last article:"
          label-for="to"
        >
          <b-form-datepicker id="to" v-model="form.to"></b-form-datepicker>
        </b-form-group>
      </b-row>

      <b-row class="mr-0 ml-0">
        <b-form-group
          id="label-language"
          class="w-25 mr-2"
          label="Language:"
          label-for="language"
        >
          <b-form-select
            id="language"
            v-model="form.language"
            :options="languages"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          class="w-25"
          id="label-sort"
          label="Sort by:"
          label-for="sortBy"
        >
          <b-form-select
            id="sortBy"
            v-model="form.sortBy"
            :options="sortOptions"
          ></b-form-select>
        </b-form-group>
      </b-row>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormFetch",

  data() {
    return {
      form: {
        title: "",
        search: "",
        from: new Date(),
        to: new Date(),
        language: "en",
        sortBy: "publishedAt",
      },
      languages: [
        "ar",
        "de",
        "en",
        "es",
        "fr",
        "he",
        "it",
        "nl",
        "no",
        "pt",
        "ru",
        "se",
        "ud",
        "zh",
      ],
      sortOptions: ["relevancy", "popularity", "publishedAt"],
    };
  },

  methods: {
    ...mapActions(["fetchNewsList"]),

    async submitClickHandler() {
      const url = {
        q: this.form.search,
        from: this.form.from,
        to: this.form.to,
        language: this.form.language,
        sortBy: this.form.sortBy,
      };
      this.fetchNewsList(url);
    },
  },
};
</script>

<style lang="scss"></style>
