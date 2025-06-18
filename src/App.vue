<template>
  <VApp>
    <SiteLoad v-if="authStore.isUserDataLoading"> </SiteLoad>
    <component :is="getCurrentLayout" v-else>
      <RouterView />
    </component>
  </VApp>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

import MainLayout from "./Layouts/MainLayout.vue";
import LoginLayout from "./Layouts/LoginLayout.vue";

import SiteLoad from "./components/SiteLoad.vue";

import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const layouts: any = {
  Main: MainLayout,
  Login: LoginLayout,
};
const route = useRoute();

const getCurrentLayout = computed(() => {
  return layouts[(route.meta.layout as string) || "Main"];
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playwrite+RO&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Birthstone&display=swap");
@import "./assets/nullstyle.scss";

$font-family: "Lato";
.v-application {
  [class*="text-"] {
    font-family: $font-family, sans-serif !important;
  }
  font-family: $font-family, sans-serif !important;
}

.card {
  z-index: 2 !important;
}
// body {
//   font-family: 'Playwrite RO', cursive;
// }
</style>
