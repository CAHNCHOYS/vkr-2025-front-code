<template>
  <div>
    <h2 class="text-h3 mb-8">Вопросы теста</h2>
    <v-card v-if="testStore.testQuestions.length" class="pa-10 rounded-0" elevation="10" border="1">
      <v-card-title>
        <v-toolbar color="indigo" class="mb-5">
          <v-toolbar-title>Всего вопросов: {{ testStore.testQuestions.length }}</v-toolbar-title>
          <v-btn @click="isAddDialogShown = true" icon="mdi-plus" color="white" />
        </v-toolbar>
        <v-text-field label="Название теста" v-model="testStore.editingTestName" class="mb-4" />

        <div class="mb-6">
          <v-btn
            color="indigo"
            prepend-icon="mdi-content-save-outline"
            class="text-white"
            @click="() => testStore.updateTestname(+route.params.id, testStore.editingTestName)"
            :loading="testStore.isActionLoading"
            >Обновить название</v-btn
          >
        </div>
      </v-card-title>
      <v-card-text>
        <TransitionGroup name="list" tag="ul"
          ><div
            v-for="(question, index) in testStore.getSortedTestQuestions"
            :key="question.id"
            class="border-thin mb-4 pa-4"
          >
            <h4 class="pl-4 text-h6 mb-3 font-weight-bold">Вопрос № {{ index + 1 }}</h4>
            <Question
              :text="question.text"
              :answers="question.answers?.split('|')"
              :type="question.type"
              :user-answer="
                question.rightAnswer.includes('|')
                  ? question.rightAnswer.split('|')
                  : question.rightAnswer
              "
              :is-editable="true"
              class="mb-6 pa-4"
              @move-question="($event) => updateOrder($event, index)"
              @delete-question="() => testStore.deleteTestQuestion(question.id)"
              @edit-question="() => editQuestion(question.id)"
            />
          </div>
        </TransitionGroup>
      </v-card-text>
    </v-card>
  </div>

  <v-dialog v-model="isAddDialogShown" max-width="900" transition="dialog-bottom-transition">
    <v-card class="pa-6" elevation="6" border="0">
      <v-card-title class="text-center text-h5 mb-4">Добавление вопроса</v-card-title>
      <v-card-text>
        <CreateQuestions
          :is-loading="testStore.isActionLoading"
          :is-test-name-entered="true"
          @update-qustion-type="selectedTestType = $event"
          @create-question="addNewQuestion"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isEditDialogShown" max-width="900" transition="dialog-bottom-transition">
    <v-card class="pa-6" elevation="6" border="0">
      <v-card-title class="text-center text-h5 mb-4">Редактирование вопроса</v-card-title>
      <v-card-text v-if="!testStore.isActionLoading">
        <EnterText
          v-if="getEditingQuestion!.type === 'text'"
          :is-editable="true"
          :edit-form-data="{
            text: getEditingQuestion!.text,
            answers: getEditingQuestion!.answers,
            rightAnswer: getEditingQuestion!.rightAnswer,
            weight: getEditingQuestion!.weight,
          }"
          @add-question="($event) => testStore.updateTestQuestion(ediditngQuestionId, $event)"
        />

        <MultiplyAnswer
          v-if="getEditingQuestion!.type === 'multiply'"
          :is-editable="true"
          :edit-form-data="{
            text: getEditingQuestion!.text,
            answers: getEditingQuestion!.answers,
            rightAnswer: getEditingQuestion!.rightAnswer,
            weight: getEditingQuestion!.weight,
          }"
          @add-question="($event) => testStore.updateTestQuestion(ediditngQuestionId, $event)"
        />

        <SingleAnswer
          v-if="getEditingQuestion!.type === 'single'"
          :is-editable="true"
          :edit-form-data="{
            text: getEditingQuestion!.text,
            answers: getEditingQuestion!.answers,
            rightAnswer: getEditingQuestion!.rightAnswer,
            weight: getEditingQuestion!.weight,
          }"
          @add-question="($event) => testStore.updateTestQuestion(ediditngQuestionId, $event)"
        />
      </v-card-text>
      <v-card-text v-else>
        <v-progress-circular color="primary" indeterminate :size="50" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-snackbar :model-value="testStore.isActionError" vertical>
    <v-alert type="error" class="text-h6">
      Ошибка при выполнении действия, вохможно, данные не сохранятся, обновите страницу!</v-alert
    >
  </v-snackbar>
  <v-snackbar :model-value="testStore.isActionSuccess" vertical color="green">
    <v-alert type="success" class="text-h6"> Действие сохранено! </v-alert>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTestStore } from "@/stores/tests";
import { useRoute } from "vue-router";
import Question from "@/components/StudentQuestions/Question.vue";

import CreateQuestions from "@/components/TestsCreation/CreateQuestions.vue";
import EnterText from "@/components/TestsCreation/TestTypes/EnterText.vue";
import MultiplyAnswer from "@/components/TestsCreation/TestTypes/MultiplyAnswer.vue";

import SingleAnswer from "@/components/TestsCreation/TestTypes/SingleAnswer.vue";

import type { CreateQuestionForm } from "@/types/forms";

const route = useRoute();
const testStore = useTestStore();
const isAddDialogShown = ref(false);
const isEditDialogShown = ref(false);

const selectedTestType = ref<"text" | "single" | "multiply">("text");

const updateOrder = async (direction: "up" | "down", currentIndex: number) => {
  if (currentIndex === 0 && direction === "up") return;
  if (currentIndex === testStore.testQuestions.length - 1 && direction === "down") return;
  let temp = testStore.getSortedTestQuestions[currentIndex].id;
  let temp2: number = 0;
  if (direction === "down") {
    await testStore.updateQuestionOrder(
      testStore.getSortedTestQuestions[currentIndex].id,
      testStore.getSortedTestQuestions[currentIndex + 1].orderInTest,
    );
    await testStore.updateQuestionOrder(
      testStore.getSortedTestQuestions[currentIndex + 1].id,
      testStore.getSortedTestQuestions[currentIndex].orderInTest,
    );

    temp2 = testStore.getSortedTestQuestions[currentIndex + 1].id;

    const update1Index = testStore.testQuestions.findIndex((q) => q.id === temp)!;
    const update2Index = testStore.testQuestions.findIndex((q) => q.id === temp2)!;
    [
      testStore.testQuestions[update1Index].orderInTest,
      testStore.testQuestions[update2Index].orderInTest,
    ] = [
      testStore.testQuestions[update2Index].orderInTest,
      testStore.testQuestions[update1Index].orderInTest,
    ];
  } else if (direction === "up") {
    await testStore.updateQuestionOrder(
      testStore.getSortedTestQuestions[currentIndex].id,
      testStore.getSortedTestQuestions[currentIndex - 1].orderInTest,
    );
    await testStore.updateQuestionOrder(
      testStore.getSortedTestQuestions[currentIndex - 1].id,
      testStore.getSortedTestQuestions[currentIndex].orderInTest,
    );
    temp2 = testStore.getSortedTestQuestions[currentIndex - 1].id;
    const update1Index = testStore.testQuestions.findIndex((q) => q.id === temp)!;
    const update2Index = testStore.testQuestions.findIndex((q) => q.id === temp2)!;
    [
      testStore.testQuestions[update1Index].orderInTest,
      testStore.testQuestions[update2Index].orderInTest,
    ] = [
      testStore.testQuestions[update2Index].orderInTest,
      testStore.testQuestions[update1Index].orderInTest,
    ];
  }
};

const addNewQuestion = async (questionFormData: CreateQuestionForm) => {
  await testStore.addNewQuestion({
    ...questionFormData,
    order:
      testStore.getSortedTestQuestions[testStore.getSortedTestQuestions.length - 1].orderInTest + 1,
    type: selectedTestType.value,
    testId: +route.params.id,
  });
};

const ediditngQuestionId = ref(0);

const editQuestion = (questionId: number) => {
  ediditngQuestionId.value = questionId;
  isEditDialogShown.value = true;
};

const getEditingQuestion = computed(() =>
  testStore.testQuestions.find((q) => q.id === ediditngQuestionId.value),
);

onMounted(async () => {
  await testStore.loadSingleTest(+route.params.id);
});
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
