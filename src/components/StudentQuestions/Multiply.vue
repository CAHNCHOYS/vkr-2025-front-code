<template>
  <v-checkbox
    :model-value="currentAnswer"
    @update:model-value="emit('updateStudentAnswer', $event as string[])"
    v-for="answer in answers"
    :key="answer"
    :value="answer"
    :label="answer"
    hide-details
  >
  </v-checkbox>

  <QuestionsNav
    :is-first="isFirst"
    :is-last="isLast"
    @change-question="emit('changeQuestion', $event)"
    class="mt-3 pl-4 pr-4"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuestionsNav from "./QuestionsNav.vue";

const props = defineProps<{
  answers: string[];
  isLast: boolean;
  isFirst: boolean;
  currentAnswer: string[];
}>();
const emit = defineEmits<{
  (e: "changeQuestion", index: number): void;
  (e: "updateStudentAnswer", answer: string[]): void;
}>();

const studentAnswers = ref<string[]>([]);
</script>
