import { ref } from "vue";
import type { TestType } from "@/types/core";
import type { CreateQuestionForm } from "@/types/forms";

export default function useTestCreation() {
  const isSubjectSelected = ref(false);
  const selectedSubjectId = ref(0);

  const testName = ref("");

  const selectedTestType = ref<TestType>("text");
  const currentQuestionNumber = ref(1);

  const selectSubject = (subjectId: number) => {
    selectedSubjectId.value = subjectId;
    isSubjectSelected.value = true;
  };



  return {
    isSubjectSelected,
    selectedSubjectId,
    testName,
    selectedTestType,
    currentQuestionNumber,
    selectSubject,
  };
}
