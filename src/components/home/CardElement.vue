<template>
  <q-card tag="label" class="my-card">
    <img :src="country.imageUrl" />
    <input
      type="radio"
      name="country"
      class="hidden"
      @change="handleRadioChange"
    />
    <div class="footer">
      <img :src="country.flag" alt="" />

      <div>
        <span>{{ country.name }}</span>
        <span>{{ country.continent.name }}</span>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Country } from "src/types/types";
import Vue from "vue";

export default Vue.extend({
  name: "CardElement",
  props: {
    country: {
      type: Object as () => Country,
      required: true,
    },
  },
  methods: {
    handleRadioChange(e: Event) {
      this.$emit("handleRadioChange", this.country, e);
    },
  },
});
</script>
