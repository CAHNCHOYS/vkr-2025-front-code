import axios from "@/api";
import type { SuccessResponse, InsertItemResponse, GetTestQuestions } from "@/types/responses";
import type { CreateQuestionForm, CreateQuestionPayload } from "@/types/forms";
import type { ITestQuestion, ITeacherTest, ITestResult } from "@/types/core";

class TestService {
  async createTest(testName: string, teacherId: number, subjectId: number) {
    const { data } = await axios.post<InsertItemResponse>("/tests/", {
      testName,
      teacherId,
      subjectId,
    });

    return data;
  }

  async addQuestion({
    text,
    type,
    answers,
    rightAnswer,
    testId,
    order,
    weight,
  }: CreateQuestionPayload) {
    console.log(answers);
    const { data } = await axios.post<InsertItemResponse>("/questions/", {
      text,
      type,
      answers,
      rightAnswer,
      testId,
      order,
      weight,
    });

    return data;
  }

  async getTeacherTests(teacherId: number) {
    const { data } = await axios.get<ITeacherTest[]>("/tests/" + teacherId);
    return data;
  }

  async deleteTeacherTest(testId: number) {
    const { data } = await axios.delete<SuccessResponse>("/tests/" + testId);
    return data;
  }

  async loadTestQuestions(testId: number) {
    console.log("gettings");

    const { data } = await axios.get<GetTestQuestions>("/student_tests/" + testId);
    return data;
  }

  async updateQuestionOrder(questionId: number, newOrder: number) {
    const { data } = await axios.patch<SuccessResponse>("/questions/order/" + questionId, {
      newOrder,
    });
    return data;
  }

  async deleteQuestion(id: number) {
    const { data } = await axios.delete<SuccessResponse>("/questions/" + id);
    return data;
  }

  async updateTestName(id: number, name: string) {
    const { data } = await axios.patch<SuccessResponse>("/tests/" + id, {
      testName: name,
    });
    return data;
  }

  async addResult(testId: number, studentName: string, studentMark: number, maxMark: number) {
    const { data } = await axios.post<SuccessResponse>("/tests/results", {
      testId,
      studentMark,
      studentName,
      maxMark,
    });
    return data;
  }

  async getTestResults(testId: number) {
    const { data } = await axios.get<ITestResult[]>("/results/" + testId);
    return data;
  }

  async updateTestQuestion(questionId: number, questionData: CreateQuestionForm) {
    const { data } = await axios.patch<SuccessResponse>(
      "/questions/edit/" + questionId,
      questionData,
    );
    return data;
  }
}

export default new TestService();
