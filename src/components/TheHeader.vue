<template>
  <v-app-bar height="70" color="indigo">
    <v-app-bar-title
      ><router-link to="/"
        ><v-img
          class="rounded-circle"
          src="../assets/Images/Test.png"
          height="50"
          width="50"
        ></v-img> </router-link
    ></v-app-bar-title>

    <v-spacer />

    <v-divider vertical class="mr-1"></v-divider>

    <SiteMenu v-if="!smAndDown" />

    <TheTeacherMenu
      v-if="authStore.isTeacherLoggedIn"
      :teacher="authStore.currentTeacher!"
      @logout="logout"
    />

    <router-link to="/login" v-else>
      <v-btn variant="text" class="text-white" prepend-icon="mdi-login"> Войти </v-btn>
    </router-link>

    <v-btn
      :icon="isMobileMenuActive ? 'mdi-close' : 'mdi-menu'"
      @click="isMobileMenuActive = !isMobileMenuActive"
      v-if="smAndDown"
    ></v-btn>
  </v-app-bar>
  <MobileMenu :is-active="isMobileMenuActive" @close-menu="isMobileMenuActive = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDisplay } from "vuetify/lib/composables/display.mjs";

import SiteMenu from "./Menus/SiteMenu.vue";
import MobileMenu from "./Menus/TheMobileMenu.vue";
import TheTeacherMenu from "./TheTeacherMenu.vue";
import { useRouter } from "vue-router";

const { smAndDown } = useDisplay();

const isMobileMenuActive = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logOutTeacher();
  router.push("/");
};
</script>
