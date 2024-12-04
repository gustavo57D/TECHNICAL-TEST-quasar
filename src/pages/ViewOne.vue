<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <h1>{{ $t("welcome") }}</h1>
      <q-input
        class="col"
        v-model="inputSearch"
        rounded
        outlined
        :placeholder="$t('searchPlaceholder')"
        @input="onSearchInput"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        outlined
        v-model="currentLocale"
        :options="availableLocales"
        :label="$t('changeLanguage')"
        @input="changeLanguage"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { i18n } from "boot/i18n";

export default Vue.extend({
  name: "ViewOne",
  data() {
    return {
      inputSearch: "",
      currentLocale: i18n.locale,
      availableLocales: [
        { label: "English", value: "en-us" },
        { label: "Español", value: "es-es" },
      ],
    };
  },
  methods: {
    onSearchInput() {
      console.log(this.inputSearch);
    },
    changeLanguage(newLocale: { value: string }) {
      i18n.locale = newLocale.value;
      // this.$forceUpdate();
    },
  },
});
</script>
