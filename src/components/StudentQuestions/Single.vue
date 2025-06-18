<template>
  <v-radio-group
    :model-value="currentAnswer"
    @update:model-value="emit('updateStudentAnswer', $event as string)"
    :inline="false"
    class="d-flex flex-column"
  >
    <v-radio v-for="answer in answers" :key="answer" :label="answer" :value="answer"> </v-radio>
  </v-radio-group>
  
  <QuestionsNav
    :is-first="isFirst"
    :is-last="isLast"
    @change-question="emit('changeQuestion', $event)"
    class="mt-3 pl-4 pr-4"
  />
</template>

<script setup lang="ts">
import QuestionsNav from "./QuestionsNav.vue";
const props = defineProps<{
  answers: string[];
  isLast: boolean;
  currentAnswer: string | null;
  isFirst: boolean;
}>();
const emit = defineEmits<{
  (e: "changeQuestion", index: number): void;
  (e: "updateStudentAnswer", answer: string): void;
}>();
</script>
