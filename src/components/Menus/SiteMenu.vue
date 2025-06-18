<template>
  <v-row justify="center" class="py-2 flex-0-1">
    <v-col cols="auto" v-for="item in defaultMenuItems" :key="item.link">
      <v-btn variant="text" :to="item.link" active-color="green-lighten-4" class="text-white" ac :prepend-icon="item.icon">
        {{ item.text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import useMenuItems from "@/composables/useMenuItems";

const { defaultMenuItems } = useMenuItems();
</script>

<style lang="scss" scoped>
.active {
  font-weight: 900 !important;
  color: red;
}
</style>
