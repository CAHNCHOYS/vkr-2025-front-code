<template>
  <v-row align="center" class="mb-6">
    <v-col cols="auto">
      <h3 class="text-h3 font-weight-bold">Создание теста</h3>
    </v-col>
  </v-row>
  <v-card elevation="8" class="pa-8">
    <v-card-text>
      <div v-if="subjectStore.isActionLoading">
        <v-progress-linear indeterminate height="10" color="indigo" />
      </div>
      <div v-else>
        <SelectSubject
          :subjects="subjectStore.teacherSubjects"
          v-if="!isSubjectSelected && subjectStore.teacherSubjects.length"
          @select-subject="selectSubject"
        />
        <v-alert
          type="info"
          class="text-h6"
          v-else-if="!isSubjectSelected && !subjectStore.isSubjectLoadError"
          >У вас пока нет созданных предметов, создайте хотя бы один для создания теста!</v-alert
        >
        <v-alert type="error" v-else-if="subjectStore.isSubjectLoadError" class="text-h6">
          Ошибка при загрузке предметов, пожалуйста, обновите страницу!
        </v-alert>
      </div>

      <EnterName
        @enter-test-name="saveTestName"
        v-if="!isTestNameEntered && isSubjectSelected"
        :is-test-adding="testStore.isActionLoading" />
      <CreateQuestions
        v-if="isTestNameEntered"
        :is-loading="testStore.isActionLoading"
        :is-test-name-entered="isTestNameEntered"
        @update-qustion-type="selectedTestType = $event"
        @create-question="addNewQuestion"
    /></v-card-text>
  </v-card>

  <v-snackbar :model-value="testStore.isActionError" vertical>
    <v-alert type="error" class="text-h6"> Ошибка при добавлении вопроса </v-alert>
  </v-snackbar>
  <v-snackbar :model-value="testStore.isActionSuccess" vertical color="green">
    <v-alert type="success" class="text-h6"> Вопрос добавлен ! </v-alert>
  </v-snackbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useSubjectStore } from "@/stores/subjects";
import { useTestStore } from "@/stores/tests";
import SelectSubject from "@/components/TestsCreation/SelectSubject.vue";
import EnterName from "@/components/TestsCreation/EnterName.vue";
import CreateQuestions from "@/components/TestsCreation/CreateQuestions.vue";

import type { CreateQuestionForm } from "@/types/forms";
import type { TestType } from "@/types/core";

const authStore = useAuthStore();
const subjectStore = useSubjectStore();
const testStore = useTestStore();

const isSubjectSelected = ref(false);
const selectedSubjectId = ref(0);

const isTestNameEntered = ref(false);
const testName = ref("");

const selectedTestType = ref<TestType>("text");
const currentQuestionNumber = ref(1);

const selectSubject = (subjectId: number) => {
  selectedSubjectId.value = subjectId;
  isSubjectSelected.value = true;
};

const saveTestName = async (name: string) => {
  if (name.length < 3) return;
  testName.value = name;
  await testStore.addNewTest(testName.value, authStore.currentTeacher!.id, selectedSubjectId.value);
  isTestNameEntered.value = true;
};

const addNewQuestion = async (questionFormData: CreateQuestionForm) => {
  await testStore.addNewQuestion({
    ...questionFormData,
    order: currentQuestionNumber.value,
    type: selectedTestType.value,
    testId: testStore.creatingTestId,
  });
  currentQuestionNumber.value++;
};

onMounted(async () => {
  if (!subjectStore.teacherSubjects.length) {
    await subjectStore.loadAllSubjects(authStore.currentTeacher!.id);
  }
});
</script>

<style lang="scss" scoped></style>
