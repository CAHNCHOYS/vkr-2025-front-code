<template>
  <v-text-field
    :model-value="currentAnswer"
    @update:model-value="emit('updateStudentAnswer', $event)"
    label="Ваш ответ"
  />

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
  isLast: boolean;
  isFirst: boolean;
  currentAnswer: string | null;
}>();
const emit = defineEmits<{
  (e: "changeQuestion", index: number): void;
  (e: "updateStudentAnswer", answer: string): void;
}>();

const studentAnswer = ref<string>("");
</script>
