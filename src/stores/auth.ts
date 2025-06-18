import { ref, computed } from "vue";
import { defineStore } from "pinia";
import AuthService from "@/services/authService";

import type { ITeacher } from "@/types/core";

export const useAuthStore = defineStore("authStore", () => {
  const isTeacherLoggedIn = ref(false);
  const isUserDataLoading = ref(false);

  const currentTeacher = ref<ITeacher | null>(null);

  const setCurrentTeacher = (teacher: ITeacher, token: string) => {
    isTeacherLoggedIn.value = true;
    currentTeacher.value = teacher;
    localStorage.setItem("token", token);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    currentTeacher.value = null;
    isTeacherLoggedIn.value = false;
  };

  const verifyUserToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        isUserDataLoading.value = true;
        const { teacher } = await AuthService.verifyUser(token);
        isTeacherLoggedIn.value = true;
        currentTeacher.value = teacher;
      } catch (error) {
        logOutUser();
        console.log(error);
      } finally {
        isUserDataLoading.value = false;
      }
    }
  };

  const logOutTeacher = () => {
    currentTeacher.value = null;
    isTeacherLoggedIn.value = false;
    localStorage.removeItem("token");
  };

  return {
    isTeacherLoggedIn,
    currentTeacher,
    isUserDataLoading,
    setCurrentTeacher,
    verifyUserToken,
    logOutTeacher,
  };
});
