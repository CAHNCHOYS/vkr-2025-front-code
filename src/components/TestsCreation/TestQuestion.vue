<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-4">
      <h4 class="text-h4">{{ question.text }}</h4>
    </v-col>
    <v-col cols="12" v-if="question.type == 'text'">
      <v-text-field label="Введите ответ"></v-text-field>
    </v-col>
    <v-col>
      
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ITestQuestion } from "@/types/core.ts";
defineProps<{
  question: ITestQuestion;
}>();




</script>

<style lang="scss" scoped></style>
