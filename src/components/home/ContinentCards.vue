<template>
  <div>
    <div v-for="continent in continents" :key="continent" class="checkbox-card">
      <label class="f-label">
        <input
          type="checkbox"
          name="continent"
          :value="continent"
          @change="handleCheckboxChange"
        />
        <img
          draggable="false"
          :src="require(`src/assets/continents/${continent}.png`)"
          alt=""
        />
      </label>
      <span>{{ continent }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

const continents = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

export default Vue.extend({
  name: "ContinentCards",
  props: {
    handleCheckboxChange: {
      type: Function as PropType<(e: Event) => void>,
      required: true,
    },
  },
  computed: {
    continents() {
      return continents;
    },
  },
});
</script>
