<template>
  <dl>
    <div>
      <dt>Capital:</dt>
      <dd>{{ countryDetail.capital || "Capital not Found" }}</dd>
    </div>

    <div>
      <dt>Language:</dt>
      <dd>{{ formattedLanguages }}</dd>
    </div>

    <div>
      <dt>Currency:</dt>
      <dd>{{ countryDetail.currency || "Currency not Found" }}</dd>
    </div>

    <div>
      <dt>Region:</dt>
      <dd>
        <ul>
          <template v-if="countryDetail.states.length === 0"
            >Regions not found</template
          >
          <template v-else>
            <li v-for="(state, index) in countryDetail.states" :key="index">
              {{ state.name }}
            </li>
          </template>
        </ul>
      </dd>
    </div>
  </dl>
</template>

<script lang="ts">
import { CountryDetail } from "src/types/types";
import Vue from "vue";

export default Vue.extend({
  props: {
    countryDetail: {
      type: Object as () => CountryDetail,
      required: true,
    },
  },

  computed: {
    formattedLanguages(): string {
      if (this.countryDetail.languages.length === 0) {
        return "Languages not found";
      }
      return this.countryDetail.languages
        .map((language) => language.name)
        .join(", ");
    },
  },
});
</script>
