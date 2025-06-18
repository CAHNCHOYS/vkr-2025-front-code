<template>
  <div class="d-flex i justify-center align-center h-screen overflow-auto">
    <VScaleTransition>
      <VAlert
        v-if="isLoginError"
        type="error"
        variant="flat"
        class="top-0 card left-0"
        position="fixed"
        max-width="380"
      >
        <p class="text-h6">{{ loginErrorMessage }}</p>
      </VAlert>
    </VScaleTransition>

    <VScaleTransition>
      <VAlert
        v-if="isLogisSuccess"
        type="success"
        variant="flat"
        class="top-0 card left-0"
        position="fixed"
        max-width="380"
      >
        <p class="text-h6">
          Авторизация прошла успешно, вы будете переведенны на главную страницу!
        </p>
      </VAlert>
    </VScaleTransition>

    <VCard
      max-width="600"
      class="pa-8 flex-grow-1 rounded-0"
      variant="flat"
      elevation="15"
      style="z-index: 100"
    >
      <VCardTitle class="text-h4 text-center font-weight-bold px-0 py-0 text-wrap mb-5">
        Авторизация
      </VCardTitle>

      <VCardActions>
        <VForm v-model="form" @submit.prevent="loginSubmit" class="w-100">
          <VRow no-gutters>
            <VCol cols="12" class="mb-4">
              <VTextField
                label="Почта"
                v-model="formData.email"
                :rules="[required, minLength, email]"
              >
              </VTextField>
            </VCol>

            <VCol cols="12" class="mb-4">
              <VTextField
                label="Пароль"
                v-model="formData.password"
                :type="isPasswordShown ? 'text' : 'password'"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="isPasswordShown = !isPasswordShown"
                :rules="[required, minLength]"
              >
              </VTextField>
            </VCol>

            <VCol cols="12" class="mb-2">
              <VBtn
                color="green"
                variant="flat"
                block
                height="50"
                type="submit"
                :loading="isLoginLoading"
                :disabled="isLoginLoading"
                >Войти</VBtn
              >
            </VCol>
            <VCol v-if="isLogisSuccess" cols="12" class="mb-2">
              <VBtn color="orange" class="text-white" variant="flat" block height="50" to="/"
                >На главную страницу</VBtn
              >
            </VCol>

            <v-col cols="12">
              <v-alert type="info">
                <p class="text-h6 mb-4">Еще нет аккаунта?</p>

                <v-btn block to="/register" variant="outlined" color="white">К регистрации</v-btn>
              </v-alert>
            </v-col>
          </VRow>
        </VForm>
      </VCardActions>
    </VCard>

    <img class="bg" src="../assets/Images/bg.jpg" alt="Фоновая картинка" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { AxiosError } from "axios";
import { useAuthStore } from "../stores/auth";
import { useRouter, useRoute } from "vue-router";

import AuthService from "@/services/authService";
import useFormValidation from "@/composables/useFormValidation";

import type { ErrorResponse } from "../types/responses";

const isPasswordShown = ref(false);
const formData = ref({
  email: "",
  password: "",
});

const isLoginError = ref(false);
const loginErrorMessage = ref<string>("");
const isLogisSuccess = ref(false);
const isLoginLoading = ref(false);

const { form, minLength, email, required } = useFormValidation();

const route = useRoute();
const router = useRouter();

const loginSubmit = async () => {
  if (!form.value) return;
  try {
    isLoginLoading.value = true;
    const { teacher, token } = await AuthService.login(formData.value);

    const authStore = useAuthStore();
    authStore.setCurrentTeacher(teacher, token);
    isLogisSuccess.value = true;

    setTimeout(() => {
      router.push({
        name: route.query.redirectedFrom ? (route.query.redirectedFrom as string) : "home",
        params: route.params,
      });
    }, 3000);
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    console.log(err);
    loginErrorMessage.value =
      err.response?.data.error || "Произошла ошибка при авторизации повторите попытку позже!";
    isLoginError.value = true;
    setTimeout(() => (isLoginError.value = false), 3000);
  } finally {
    isLoginLoading.value = false;
  }
};

watch(
  () => route.query.isLoginRequired,
  () => {
    if (route.query.isLoginRequired) {
      isLoginError.value = true;
      loginErrorMessage.value = `Для доступа к странице ${route.query.redirectedFrom} необходимо авторизироваться`;
      setTimeout(() => {
        isLoginError.value = false;
        loginErrorMessage.value = "";
      }, 3000);
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}
</style>
