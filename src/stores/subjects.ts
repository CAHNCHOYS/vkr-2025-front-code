import subjectService from "@/services/subjectService";

import { defineStore } from "pinia";
import { ref } from "vue";

import type { ISubject } from "@/types/core";
import type { ErrorResponse } from "@/types/responses";
import type { AxiosError } from "axios";

export const useSubjectStore = defineStore("subjectStore", () => {
  const isActionLoading = ref(false);
  const isActionSuccess = ref(false);

  const isSubjectActionError = ref(false);
  const subjectActionErrorMessage = ref("");

  const isSubjectLoadError = ref(false);

  const teacherSubjects = ref<ISubject[]>([]);

  const addSubject = async (teacherId: number, subjectName: string) => {
    try {
      isActionLoading.value = true;
      const { id } = await subjectService.addTeacherSubject(subjectName, teacherId);
      teacherSubjects.value.push({ id, name: subjectName });
      isActionSuccess.value = true;
      setTimeout(() => (isActionSuccess.value = false), 2000);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log(err);
      subjectActionErrorMessage.value =
        err.response?.data.error || "Произошла ошибка при добавлении, повторите попытку позже!";
      isSubjectActionError.value = true;
      setTimeout(() => (isSubjectActionError.value = false), 2000);
    } finally {
      isActionLoading.value = false;
    }
  };

  const loadAllSubjects = async (teacherId: number) => {
    try {
      isActionLoading.value = true;
      const { subjects } = await subjectService.loadAllTeacherSubjects(teacherId);
      console.log(subjects);
      teacherSubjects.value = subjects;
    } catch (error) {
      isSubjectLoadError.value = true;
      console.log(error);
    } finally {
      isActionLoading.value = false;
    }
  };

  const deleteSubject = async (subjectId: number) => {
    try {
      await subjectService.deleteTeacherSubject(subjectId);
      teacherSubjects.value = teacherSubjects.value.filter((subject) => subject.id != subjectId);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log(err);
      subjectActionErrorMessage.value =
        err.response?.data.error ||
        "Произошла ошибка при удалении предмета, повторите попытку позже!";
      isSubjectActionError.value = true;
      setTimeout(() => (isSubjectActionError.value = false), 3000);
    }
  };

  return {
    teacherSubjects,
    isActionLoading,
    isActionSuccess,
    isSubjectActionError,
    isSubjectLoadError,
    subjectActionErrorMessage,
    addSubject,
    loadAllSubjects,
    deleteSubject,
  };
});
