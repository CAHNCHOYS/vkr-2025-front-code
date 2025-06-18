<template>
  <v-navigation-drawer
    :model-value="isActive"
    @update:model-value="$emit('closeMenu')"
    class="pt-16 pb-5 px-2 overflow-auto"
    temporary
    :class="isActive ? 'h-screen' : ''"
    location="bottom"
    absolute
  >
    <v-list class="pt-5" >
      <v-list-item
        v-for="item in defaultMenuItems"
        :key="item.link"
        :prepend-icon="item.icon"
        :value="item.link"
      >
        <v-list-item-title>
          <router-link :to="item.link" class="text-black d-block text-h6">
            {{ item.text }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import useMenuItems from "@/composables/useMenuItems";
const props = defineProps<{
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "closeMenu"): void;
}>();


const { defaultMenuItems } = useMenuItems();
</script>
