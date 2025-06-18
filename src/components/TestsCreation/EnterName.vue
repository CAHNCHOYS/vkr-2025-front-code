<template>
  <v-row>
    <v-col cols="12">
      <v-text-field v-model="testName" placeholder="Введите название теста"
    /></v-col>
    <v-col cols="12"> <v-btn @click="enterNameSubmit" color="green" :loading="isTestAdding">Продолжить</v-btn></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  isTestAdding: boolean;
}>();

const emit = defineEmits<{
  (e: "enterTestName", name: string): void;
}>();

const testName = ref("");

const enterNameSubmit = () => {
  emit("enterTestName", testName.value);
};
</script>

<style lang="scss" scoped></style>
