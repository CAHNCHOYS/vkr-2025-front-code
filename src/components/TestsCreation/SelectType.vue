<template>
  <h3 class="text-h6 mb-4">Выберете вид вопроса для добавления</h3>
  <v-radio-group v-model="selectedType" @update:model-value="changeType" inline class="mb-5">
    <v-radio label="Текстовый ввод ответа" value="text"></v-radio>
    <v-radio label="Несколько правильных ответов" value="multiply"></v-radio>
    <v-radio label="Один правильный ответ" value="single"></v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TestType } from "@/types/core";

const emit = defineEmits<{
  (e: "changeType", type: TestType): void;
}>();

const selectedType = ref<TestType>("text");

const changeType = () => {
  emit("changeType", selectedType.value);
};
</script>

<style lang="scss" scoped></style>
