<template>
  <q-layout view="lhr lpr lfr">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :mini="miniState"
      :width="202"
      :breakpoint="500"
      :style="drawerStyle"
    >
      <div class="logo" style="height: 10%; padding-left: 1px">
        <LogoIcon />
        <span>FractalUp</span>
      </div>
      <q-list style="height: 80%">
        <q-item exact clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section> Home </q-item-section>
        </q-item>
        <q-item exact clickable v-ripple to="/view-one">
          <q-item-section avatar>
            <q-icon name="visibility" />
          </q-item-section>
          <q-item-section> View 1 </q-item-section>
        </q-item>
        <q-item exact clickable v-ripple to="/view-two">
          <q-item-section avatar>
            <q-icon name="visibility" />
          </q-item-section>
          <q-item-section> View 2 </q-item-section>
        </q-item>
      </q-list>
      <div class="text-right" style="padding-right: 10px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          class="rotate-icon"
          :class="{ rotated: miniState }"
          @click="miniState = !miniState"
          v-if="$q.screen.width > 500"
        />
      </div>
    </q-drawer>
    <q-btn
      v-if="showHeader"
      flat
      color="primary"
      @click="leftDrawerOpen = !leftDrawerOpen"
      round
      dense
      icon="menu"
      style="position: fixed; top: 0; left: 0; z-index: 4"
    />
    <q-page-container style="margin-top: -100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from "vue";
import LogoIcon from "components/sidebar/icons/LogoIcon.vue";

export default Vue.extend({
  name: "MainLayout",
  components: { LogoIcon },
  data(): { leftDrawerOpen: boolean; miniState: boolean } {
    return {
      leftDrawerOpen: false,
      miniState: false,
    };
  },
  computed: {
    showHeader(): boolean {
      return this.$q.screen.width <= 500 && !this.leftDrawerOpen;
    },
    showHeaderResponsive(): boolean {
      return this.$q.screen.width <= 500 && this.leftDrawerOpen;
    },
    drawerStyle(): { [key: string]: string | number } {
      return {
        position: "sticky",
        top: "0",
        left: "0",
        height: "100vh",
        zIndex: this.showHeaderResponsive ? 4 : "initial", // Usar showHeader sin problemas
      };
    },
  },
});
</script>
<style scoped lang="scss">
@import url(./MainLayout.scss);
</style>
