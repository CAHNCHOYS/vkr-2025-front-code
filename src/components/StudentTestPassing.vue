<template>
  <div v-if="questions.length" class="border-thin pa-2">
    <div v-if="!isTestFinished">
      <v-pagination v-model="currentStudentQuestion" :length="questions.length" rounded active-color="green-darken-4" />

      <h3 class="text-h6 mb-4">
        Вопрос № {{ currentStudentQuestion }}: {{ getCurrentStudentQuestion.text }}
      </h3>

      <Text
        v-if="getCurrentStudentQuestion.type === 'text'"
        :is-first="currentStudentQuestion === 1"
        :is-last="isLastQuestion"
        :current-answer="studentAnswers[currentStudentQuestion - 1]"
        @update-student-answer="updateStudentAnswers"
        @change-question="changeQuestion"
      />
      <Single
        v-if="getCurrentStudentQuestion.type === 'single'"
        :is-first="currentStudentQuestion === 1"
        :is-last="isLastQuestion"
        :answers="getCurrentStudentQuestion.answers.split('|')"
        :current-answer="studentAnswers[currentStudentQuestion - 1]"
        @update-student-answer="updateStudentAnswers"
        @change-question="changeQuestion"
      />

      <Multiply
        v-if="getCurrentStudentQuestion.type === 'multiply'"
        :is-first="currentStudentQuestion === 1"
        :is-last="isLastQuestion"
        :answers="getCurrentStudentQuestion.answers.split('|')"
        :current-answer="studentAnswers[currentStudentQuestion - 1]!.split('|')"
        @update-student-answer="updateStudentAnswers"
        @change-question="changeQuestion"
      />
    </div>

    <div v-else>
      <h3 class="text-h6 mb-4 text-center">Результаты прохождения теста</h3>

      <div
        v-for="(question, index) in questions"
        :class="correctAnswers[index] === 0 ? 'bg-red-lighten-4' : 'bg-light-green-lighten-4'"
        class="mb-4 pa-2"
      >
        <Question
          :key="question.id"
          :text="question.text"
          :answers="question.answers?.split('|')"
          :type="question.type"
          :user-answer="getStudentAnswerToShow(index)"
          :is-editable="false"
        />
      </div>
      <v-divider thickness="4" class="mb-4" />

      <v-alert type="info" class="text-h6 mb-4">
        Вы набрали
        <span class="font-weight-bold">{{ getStudentMark }}</span>
        баллов из
        {{ getMaxMark }}
      </v-alert>

      <v-btn to="/" block color="green">На главную страницу</v-btn>
    </div>
  </div>
  <div v-else>
    <v-alert type="info" class="text-h6"
      ><p>
        Вопросов не найдено, возможно, тест удален или в нем попросту отсутствуют вопрсы
      </p></v-alert
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import Question from "./StudentQuestions/Question.vue";
import Single from "./StudentQuestions/Single.vue";
import Multiply from "./StudentQuestions/Multiply.vue";
import Text from "./StudentQuestions/Text.vue";

import { useTestStore } from "@/stores/tests";
import { useRoute } from "vue-router";
import type { ITestQuestion } from "@/types/core";

const props = defineProps<{
  questions: ITestQuestion[];
  studentName: string;
}>();

const currentStudentQuestion = ref(1);
const studentAnswers = ref<string[]>(Array(props.questions.length).fill(""));
const correctAnswers = ref<number[]>(Array(props.questions.length).fill(0));

const isLastQuestion = computed(() => currentStudentQuestion.value === props.questions.length);
const getCurrentStudentQuestion = computed(() => props.questions[currentStudentQuestion.value - 1]);
const isTestFinished = ref(false);

const testStore = useTestStore();
const route = useRoute();

const updateStudentAnswers = (answer: string | string[]) => {
  if (Array.isArray(answer)) {
    studentAnswers.value[currentStudentQuestion.value - 1] = answer.join("|");
  } else studentAnswers.value[currentStudentQuestion.value - 1] = answer;
};

const changeQuestion = (index: number) => {
  if (isLastQuestion.value && index === 1) {
    finishTest();
  } else {
    if (index === -1) currentStudentQuestion.value--;
    else currentStudentQuestion.value++;
  }
};

const finishTest = async () => {
  currentStudentQuestion.value = 1;
  studentAnswers.value.forEach((answer, index) => {
    const currentQuestion = props.questions[index];
    switch (currentQuestion.type) {
      case "multiply":
        if (
          currentQuestion.rightAnswer.split("").sort().join("") ===
          answer!.slice(1).split("").sort().join("")
        )
          correctAnswers.value[index] = currentQuestion.weight;
        break;
      default:
        currentQuestion.rightAnswer == answer
          ? (correctAnswers.value[index] = currentQuestion.weight)
          : (correctAnswers.value[index] = 0);
    }
  });
  isTestFinished.value = true;
  await testStore.addTestResult(
    +route.params.testId,
    props.studentName,
    getStudentMark.value,
    getMaxMark.value,
  );
};

const getStudentMark = computed(() => correctAnswers.value.reduce((prev, cur) => prev + cur));
const getMaxMark = computed(() => props.questions.reduce((prev, cur) => prev + cur.weight, 0));

const getStudentAnswerToShow = (index: number) => {
  return computed(() =>
    studentAnswers.value[index]?.includes("|")
      ? studentAnswers.value[index].split("|")
      : studentAnswers.value[index],
  ).value;
};
</script>

<style lang="scss"></style>
