import type { ITeacher, ISubject, ITeacherTest, ITestQuestion } from "./core";

export type ErrorResponse = {
  error: string;
};

export type SuccessResponse = {
  isSuccess: true;
};

export type LoginResponse = {
  teacher: ITeacher;
  token: string;
};

export type VerifyUserResponse = {
  teacher: ITeacher;
};

export type GetTeacherSubjects = {
  subjects: ISubject[];
};

export type InsertTeacherSubject = {
  id: number;
};

export type InsertItemResponse = {
  id: number;
};

export type GetTestQuestions = {
  testName: string;
  questions: ITestQuestion[];
};
