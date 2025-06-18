type TeacherCategory = "ассистент" | "доцент" | "старший преподаватель" | "профессор";

export type TestType = "text" | "single" | "multiply";

export interface ITeacher {
  id: number;
  firstName: number;
  secondName: number;
  thirdName: number;
  email: number;
  password: number;
  category: TeacherCategory;
}

export interface ISubject {
  id: number;
  name: string;
}

export interface ITeacherTest {
  id: number;
  subjectId: number;
  subjectName?: string; // только для показа на странице тестов учителя
  name: string;
}

export interface ITestQuestion {
  id: number;
  text: string;
  type: TestType;
  rightAnswer: string;
  answers: string;
  weight: number;
  orderInTest: number;
}

export interface ITestResult {
  id: number;
  studentName: string;
  studentMark: number;
  maxMark: number;
}
