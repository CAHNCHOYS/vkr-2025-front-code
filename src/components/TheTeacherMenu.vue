<template>
  <v-menu :close-on-content-click="false" max-width="400">
    <template #activator="{ props }">
      <v-btn v-bind="props" prepend-icon="mdi-account-circle-outline">Аккаунт</v-btn>
    </template>

    <v-list rounded="0" min-width="300" density="comfortable" class="bg-white">
      <v-list-subheader class="text-h6 text-black text-wrap">{{
        teacher.firstName + " " + teacher.secondName + " " + teacher.thirdName
      }}</v-list-subheader>
      <v-list-item>
        <v-list-item-title> Должность: {{ teacher.category }} </v-list-item-title>
        <v-list-item-subtitle class="text-black">
          почта: <span class="font-weight-bold">{{ teacher.email }}</span>
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider thickness="2" class="mt-1"> </v-divider>
      <v-list-item @click="$emit('logout')" prepend-icon="mdi-exit-run">
        <v-list-item-title>Выйти</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { ITeacher } from "@/types/core";

const emit = defineEmits<{
  (e: "logout"): void;
}>();
const props = defineProps<{ teacher: ITeacher }>();
</script>

<style lang="scss" scoped></style>
