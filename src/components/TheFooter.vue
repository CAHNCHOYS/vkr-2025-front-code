<template>
  <v-footer app color="#17213C" class="d-flex flex-column py-0">
    <v-container>
      <SiteMenu />

      <v-divider class="border-opacity-100 w-100" color="white"></v-divider>

      <div class="text-center text-white text-subtitle-2 pt-5">
        Донецк - 2025
        <a href="ю" class="text-white" target="_blank"><v-icon icon="mdi-github"></v-icon></a>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import SiteMenu from "./Menus/SiteMenu.vue";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
