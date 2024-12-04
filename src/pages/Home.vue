<template>
  <q-page class="column">
    <div class="row q-py-sm q-px-xl">
      <search class="search-section">
        <q-input
          class="col"
          v-model="inputSearch"
          rounded
          ref="searchRef"
          outlined
          placeholder="Search"
          @input="handleInputChangue"
          style="width: 80%"
          @focus="handleFocus"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </search>
      <div ref="filterShow" class="filter-section hidden">
        <div class="filter-header">
          <span>Filter by continents</span>
          <button class="clean-filter" @click="handleFilterCleaning">
            Clear
          </button>
        </div>
        <div class="filter-main">
          <ContinentCards :handleCheckboxChange="handleCheckboxChange" />
        </div>
      </div>
    </div>
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <template v-if="loading">
        <h2>Loading...</h2>
      </template>
      <template v-else>
        <h4 v-if="countries.length === 0">
          No results found for <span>{{ inputSearch }}</span>
        </h4>
        <template v-else>
          <CardElement
            v-for="country in countries"
            :key="country.code"
            @handleRadioChange="handleRadioChange"
            :country="country"
          />
        </template>
      </template>
    </div>
    <template v-if="countryDetail">
      <CountryDetailElement
        :countryDetail="countryDetail"
        :handleCountryDetailClosure="handleCountryDetailClosure"
      />
    </template>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { ApolloQueryResult } from "@apollo/client";
import { GET_COUNTRIES_QUERY } from "src/api/querys";
import { fetchPixabayAndFlags } from "src/api/getAllData";
import { Country, HomeViewState } from "src/types/types";
import { searchAndFilter } from "src/services/countryService";
import CountryDetailElement from "src/components/home/CountryDetailElement.vue";
import ContinentCards from "src/components/home/ContinentCards.vue";
import CardElement from "src/components/home/CardElement.vue";

function isHTMLInputElement(
  element: EventTarget | null
): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}

export default Vue.extend({
  components: { CountryDetailElement, ContinentCards, CardElement },
  name: "PageIndex",
  data(): HomeViewState {
    return {
      countries: [],
      loading: true,
      error: null,
      initialCountries: [],
      selectedContinents: [],
      inputSearch: "",
      inputRadioRef: null,
      countryDetail: null,
    };
  },
  async mounted() {
    await this.fetchCountries();
    document.addEventListener("mousedown", this.handler.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.handler.bind(this));
  },
  methods: {
    handleFocus() {
      const filterShow = this.$refs.filterShow as HTMLElement;
      filterShow.classList.remove("hidden");
    },
    handler(e: Event) {
      const searchRef = (this.$refs.searchRef as Vue).$el as HTMLElement; // Acceder al DOM del componente
      const filterShow = this.$refs.filterShow as HTMLElement;
      const target = e.target as Node | null;

      if (
        target &&
        !filterShow.contains(target) &&
        !searchRef.contains(target)
      ) {
        filterShow.classList.add("hidden");
      }
    },
    onSearchInput() {
      console.log(this.inputSearch);
    },
    async fetchCountries() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: ApolloQueryResult<{ countries: Country[] }> =
          await this.$apollo.query<{ countries: Country[] }>({
            query: GET_COUNTRIES_QUERY,
          });
        console.log("result", result);

        const { countriesWithImages } = await fetchPixabayAndFlags(
          result.data.countries
        );
        this.countries = countriesWithImages;
        this.initialCountries = countriesWithImages;
      } catch (err) {
        this.error = "An error occurred while loading data. Please try again.";
        console.log("err: ", err);
      } finally {
        this.loading = false;
      }
    },
    updateFilteredResults() {
      const filteredResults = searchAndFilter(
        this.initialCountries,
        this.inputSearch,
        this.selectedContinents
      );
      this.countries = filteredResults;
    },
    handleInputChangue() {
      // console.log(e);

      // if (isHTMLInputElement(e.target)) {
      // this.inputSearch = e.target.value;
      // this.inputSearch = e.target.value;

      this.updateFilteredResults();
      // }
    },
    handleCheckboxChange(e: Event) {
      if (isHTMLInputElement(e.target)) {
        if (e.target.checked) this.selectedContinents.push(e.target.value);
        else
          this.selectedContinents.splice(
            this.selectedContinents.indexOf(e.target.value),
            1
          );
        this.updateFilteredResults();
      }
    },
    handleFilterCleaning() {
      this.selectedContinents = [];
      document.getElementsByName("continent").forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false;
        }
      });
      this.updateFilteredResults();
    },
    handleRadioChange(country: Country, e: Event) {
      if (isHTMLInputElement(e.target)) {
        this.inputRadioRef = e.target;
        this.countryDetail = country;
      }
    },
    handleCountryDetailClosure() {
      if (this.inputRadioRef instanceof HTMLInputElement)
        this.inputRadioRef.checked = false;
      this.countryDetail = null;
    },
  },
});
</script>

<style lang="scss" scoped>
@import url(./Home.scss);
</style>
