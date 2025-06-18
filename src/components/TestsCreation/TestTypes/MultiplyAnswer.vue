<template>
  <v-form @submit.prevent="submitForm">
    <v-row no-gutters>
      <v-col cols="12" class="mb-4">
        <v-textarea
          v-model="formData.text"
          variant="outlined"
          label="Введите текст вопроса"
          hide-details
        />
      </v-col>
      <v-col cols="12" class="mb-4">
        <div class="d-flex justify-space-between align-center mb-4">
          <h4 class="mb-2 text-h6 pr-2">Добавьте ответы и выберете правильные</h4>
          <v-btn icon="mdi-plus" color="green" @click="addAnswer" />
        </div>
        <div v-if="currentAnswerNumber">
          <EnterSingle
            v-for="answer in currentAnswers"
            :key="answer.id"
            :id="answer.id"
            :text="answer.text"
            :selected-id="selectedAnswerId"
            :is-selected="answer.isRight"
            @update-answer="updateQuestionAnswers"
            @delete-answer="deleteAnswer"
          />
        </div>
      </v-col>

      <v-col cols="12" class="mb-4">
        <v-text-field
          v-model="formData.weight"
          label="Количество баллов за правильный ответ"
          type="number"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn type="submit" color="green"
          >{{ isEditable ? "Обновить вопрос" : "Создать вопрос" }}
        </v-btn>
      </v-col>
      {{ editFormData }}
      <p>{{ currentAnswers }}</p>
      <p>{{ formData }}</p>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import EnterSingle from "./EnterSingle.vue";
import useQuestionCreation from "@/composables/useQuestionCreation";

import type { CreateQuestionForm } from "@/types/forms";

const props = defineProps<{
  editFormData?: CreateQuestionForm;
  isEditable: boolean;
}>();

const emit = defineEmits<{
  (e: "addQuestion", questionData: CreateQuestionForm): void;
}>();

const {
  formData,
  currentAnswers,
  selectedAnswerId,
  currentAnswerNumber,
  addAnswer,
  deleteAnswer,
  updateQuestionAnswers,
  submitQuestionAnswers,
  resetQuestionCreation,
} = useQuestionCreation();

if (props.editFormData) {
  formData.value.text = props.editFormData.text;
  formData.value.answers = props.editFormData.answers;
  formData.value.weight = props.editFormData.weight;
  formData.value.rightAnswer = props.editFormData.rightAnswer;

  const answers = props.editFormData.answers.split("|");
  const rightAnswers = props.editFormData.rightAnswer.split("|");
  currentAnswerNumber.value = answers.length;
  answers.forEach((answer, index) => {
    currentAnswers.value.push({
      id: index + 1,
      text: answer,
      isRight: rightAnswers.includes(answer),
    });
  });
}

const submitForm = () => {
  if (!currentAnswers.value.some((answ) => answ.isRight)) return;
  submitQuestionAnswers();
  let rightAnswer = "";
  currentAnswers.value.forEach((answer) =>
    answer.isRight ? (rightAnswer += answer.text + "|") : (rightAnswer = rightAnswer),
  );
  rightAnswer = rightAnswer.slice(0, -1);
  formData.value.rightAnswer = rightAnswer;

  emit("addQuestion", formData.value);
  if (!props.isEditable) resetQuestionCreation();
};
</script>

<style lang="scss" scoped></style>
