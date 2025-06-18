import { defineStore } from "pinia";
import { computed, ref } from "vue";

import TestService from "@/services/testService";

import type { ITeacherTest, ITestQuestion } from "@/types/core";
import type { CreateQuestionForm, CreateQuestionPayload } from "@/types/forms";

export const useTestStore = defineStore("testStore", () => {
  const createdTestName = ref("");
  const editingTestName = ref("");

  const isActionLoading = ref(false);
  const isActionSuccess = ref(false);
  const isActionError = ref(false);

  const isTestsLoading = ref(false);
  const isTestsLoadError = ref(false);

  const teacherTests = ref<ITeacherTest[]>([]);
  const testQuestions = ref<ITestQuestion[]>([]);

  const creatingTestId = ref(0);

  const getSortedTestQuestions = computed(() =>
    [...testQuestions.value].sort((q1, q2) => q1.orderInTest - q2.orderInTest),
  );

  const addNewTest = async (testName: string, teacherId: number, subjectId: number) => {
    try {
      isActionLoading.value = true;

      const { id } = await TestService.createTest(testName, teacherId, subjectId);
      creatingTestId.value = id;
      teacherTests.value.push({
        id,
        subjectId,
        name: testName,
      });
    } catch (error) {
      console.log(error);
    }

    isActionLoading.value = false;
  };

  const loadAllTeacherTests = async (teacherId: number) => {
    try {
      isTestsLoading.value = true;
      const tests = await TestService.getTeacherTests(teacherId);
      teacherTests.value = tests;
    } catch (error) {
      isTestsLoadError.value = true;
    }
    isTestsLoading.value = false;
  };

  const deleteTeacherTest = async (testId: number) => {
    try {
      isActionLoading.value = true;
      await TestService.deleteTeacherTest(testId);
      teacherTests.value = teacherTests.value.filter((test) => test.id != testId);
    } catch (error) {
      console.log(error);
    }
    isActionLoading.value = false;
  };

  const addNewQuestion = async (questionPayload: CreateQuestionPayload) => {
    try {
      isActionLoading.value = true;

      const { id } = await TestService.addQuestion(questionPayload);

      testQuestions.value.push({
        id,
        text: questionPayload.text,
        type: questionPayload.type,
        rightAnswer: questionPayload.rightAnswer,
        answers: questionPayload.answers,
        weight: questionPayload.weight,
        orderInTest: questionPayload.order,
      });

      isActionSuccess.value = true;
    } catch (error) {
      console.log(error);
      isActionError.value = true;
      setTimeout(() => (isActionError.value = false), 3000);
    }
    isActionLoading.value = false;

    setTimeout(() => (isActionSuccess.value = false), 3000);
  };

  const loadSingleTest = async (id: number) => {
    try {
      isTestsLoading.value = true;
      const { questions, testName } = await TestService.loadTestQuestions(id);
      testQuestions.value = questions;
      editingTestName.value = testName;
    } catch (error) {
      isTestsLoadError.value = true;
    }
    isTestsLoading.value = false;
  };

  const updateQuestionOrder = async (id: number, newOrder: number) => {
    try {
      isActionLoading.value = true;
      await TestService.updateQuestionOrder(id, newOrder);
    } catch (error) {
      isActionError.value = true;
      setTimeout(() => (isActionError.value = false), 3000);
    }
    isActionLoading.value = false;
  };

  const updateTestname = async (id: number, name: string) => {
    try {
      isActionLoading.value = true;
      await TestService.updateTestName(id, name);
      isActionSuccess.value = true;
    } catch (error) {
      isActionError.value = true;
      setTimeout(() => (isActionError.value = false), 3000);
    }
    isActionLoading.value = false;
    setTimeout(() => (isActionSuccess.value = false), 3000);
  };

  const addTestResult = async (
    testId: number,
    studentName: string,
    studentMark: number,
    maxMark: number,
  ) => {
    try {
      await TestService.addResult(testId, studentName, studentMark, maxMark);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTestQuestion = async (id: number) => {
    try {
      await TestService.deleteQuestion(id);
      testQuestions.value = testQuestions.value.filter((q) => q.id != id);
    } catch (error) {
      
    }
  };

  const updateTestQuestion = async (id: number, newData: CreateQuestionForm) => {
    try {
      isActionLoading.value = true;
      await TestService.updateTestQuestion(id, newData);
      let curQuestion = testQuestions.value.find((q) => q.id === id);
      curQuestion!.text = newData.text;
      curQuestion!.answers = newData.answers;
      curQuestion!.weight = newData.weight;
      curQuestion!.rightAnswer = newData.rightAnswer;
      isActionSuccess.value = true;
    } catch (error) {
      isActionError.value = true;
      setTimeout(() => (isActionError.value = false), 3000);
    }
    isActionLoading.value = false;
    setTimeout(() => (isActionSuccess.value = false), 3000);
  };

  return {
    isActionLoading,
    isTestsLoadError,
    isActionError,
    isActionSuccess,
    isTestsLoading,
    createdTestName,
    editingTestName,
    creatingTestId,
    teacherTests,
    testQuestions,
    getSortedTestQuestions,
    addNewTest,
    addNewQuestion,
    loadAllTeacherTests,
    deleteTeacherTest,
    loadSingleTest,
    updateQuestionOrder,
    updateTestname,
    addTestResult,
    deleteTestQuestion,
    updateTestQuestion,
  };
});
