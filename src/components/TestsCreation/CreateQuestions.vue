<template>
  <h3 class="text-h6 mb-4">Выберете вид вопроса для добавления</h3>
  <v-radio-group
    v-model="selectedTestType"
    @update:model-value="emit('updateQustionType', selectedTestType)"
    inline
    class="mb-5"
  >
    <v-radio label="Текстовый ввод ответа" value="text"></v-radio>
    <v-radio label="Несколько правильных ответов" value="multiply"></v-radio>
    <v-radio label="Один правильный ответ" value="single"></v-radio>
  </v-radio-group>

  <div v-if="isTestNameEntered" elevation="6" class="pa-4">
    <div v-if="isLoading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="red" size="64" />
    </div>
    <div v-else>
      <EnterText
        v-if="selectedTestType == 'text'"
        :is-editable="false"
        @add-question="emit('createQuestion', $event)"
      />
      <SingleAnswer
        v-if="selectedTestType == 'single'"
        :is-editable="false"
        @add-question="emit('createQuestion', $event)"
      />
      <MultiplyAnswer
        v-if="selectedTestType === 'multiply'"
        :is-editable="false"
        @add-question="emit('createQuestion', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import EnterText from "@/components/TestsCreation/TestTypes/EnterText.vue";
import SingleAnswer from "@/components/TestsCreation/TestTypes/SingleAnswer.vue";
import MultiplyAnswer from "@/components/TestsCreation/TestTypes/MultiplyAnswer.vue";
import type { CreateQuestionForm } from "@/types/forms";
import type { TestType } from "@/types/core";

const props = defineProps<{
  isLoading: boolean;
  isTestNameEntered: boolean;
}>();

const emit = defineEmits<{
  (e: "createQuestion", questionData: CreateQuestionForm): void;
  (e: "updateQustionType", type: TestType): void;
}>();

const selectedTestType = ref<TestType>("text");
</script>

<style lang="scss" scoped></style>
