import { ref } from "vue";
import type { CreateQuestionForm } from "@/types/forms";

export default function useQuestionCreation() {
  const formData = ref<CreateQuestionForm>({
    text: "",
    weight: 0,
    rightAnswer: "",
    answers: "",
  });

  type Answer = {
    id: number;
    text: string;
    isRight: boolean;
  };

  const currentAnswerNumber = ref(0);

  const currentAnswers = ref<Answer[]>([]);
  const selectedAnswerId = ref(0);

  const addAnswer = () => {
    currentAnswerNumber.value++;
    currentAnswers.value.push({ id: currentAnswerNumber.value, text: "", isRight: false });
  };

  const deleteAnswer = (id: number) => {
    currentAnswers.value = currentAnswers.value.filter((answer) => answer.id != id);
    currentAnswerNumber.value--;
  };

  const updateQuestionAnswers = (answerText: string, isSelected: boolean, id: number) => {
    currentAnswers.value = currentAnswers.value.map((answer) =>
      answer.id === id ? { id, isRight: isSelected, text: answerText } : answer,
    );
  };

  const resetQuestionCreation = () => {
    formData.value.answers = "";
    formData.value.rightAnswer = "";
    formData.value.text = "";
    formData.value.weight = 0;
    currentAnswers.value = [];
    currentAnswerNumber.value = 0;
  };

  const submitQuestionAnswers = () => {
    let questionAnswers = "";
    currentAnswers.value.forEach((answers) => {
      questionAnswers += answers.text + "|";
    });
    questionAnswers = questionAnswers.slice(0, -1);
    formData.value.answers = questionAnswers;
  };

  return {
    formData,
    currentAnswerNumber,
    currentAnswers,
    selectedAnswerId,
    addAnswer,
    deleteAnswer,
    updateQuestionAnswers,
    submitQuestionAnswers,
    resetQuestionCreation,
  };
}
