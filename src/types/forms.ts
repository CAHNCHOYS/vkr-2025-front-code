export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {};

export type CreateQuestionForm = {
  text: string;
  answers: string;
  rightAnswer: string;
  weight: number;
};

export type CreateQuestionPayload = CreateQuestionForm & {
  type: "text" | "single" | "multiply";
  testId?: number;
  order: number;
};
