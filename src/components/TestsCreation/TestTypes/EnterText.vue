<template>
  <v-form @submit.prevent="submitForm">
    <v-row no-gutters>
      <v-col cols="12" class="mb-4">
        <v-textarea v-model="formData.text" variant="outlined" label="Введите текст вопроса" />
      </v-col>
      <v-col cols="12" class="mb-4">
        <v-text-field v-model="formData.rightAnswer" label="Введите ответ на вопрос" />
      </v-col>

      <v-col cols="12" class="mb-4">
        <v-text-field
          v-model="formData.weight"
          label="Количество баллов за правильный ответ"
          type="number"
        />
      </v-col>

      <v-col cols="12">
        <v-btn type="submit" color="green">{{
          isEditable ? "Обновить вопрос" : "Создать вопрос"
        }}</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import useQuestionCreation from "@/composables/useQuestionCreation";
import type { CreateQuestionForm } from "@/types/forms";

const props = defineProps<{
  editFormData?: CreateQuestionForm;
  isEditable: boolean;
}>();

const emit = defineEmits<{
  (e: "addQuestion", questionData: CreateQuestionForm): void;
}>();

const { formData, resetQuestionCreation } = useQuestionCreation();

if (props.editFormData) {
  formData.value.text = props.editFormData.text;
  formData.value.answers = props.editFormData.answers;
  formData.value.weight = props.editFormData.weight;
  formData.value.rightAnswer = props.editFormData.rightAnswer;
}

const submitForm = () => {
  emit("addQuestion", formData.value);
  if (!props.isEditable) resetQuestionCreation();
};
</script>

<style lang="scss" scoped></style>
@/composables/useQuestionCreation
