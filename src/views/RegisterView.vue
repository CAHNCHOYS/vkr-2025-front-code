<template>
  <div class="d-flex top justify-center align-center h-screen overflow-auto">
    <VScaleTransition>
      <VAlert
        v-if="isRegisterSuccess"
        type="success"
        variant="flat"
        class="top-0 card left-0"
        position="fixed"
        max-width="380"
      >
        <p class="text-h6">Регистрация прошла успешно, можете перейти к авторизации!</p>
      </VAlert>
    </VScaleTransition>

    <VScaleTransition>
      <VAlert
        v-if="isRegisterFail"
        type="error"
        variant="flat"
        class="top-0 card left-0"
        position="fixed"
        max-width="380"
      >
        <p class="text-h6">{{ registerErrorMessage }}</p>
      </VAlert>
    </VScaleTransition>

    <VCard max-width="600" class="pa-8 flex-grow-1 rounded-0 card" variant="flat" elevation="15">
      <VCardTitle class="text-h4 text-center font-weight-bold px-0 py-0 text-wrap mb-5">
        Регистрация
      </VCardTitle>

      <VCardActions>
        <VForm @submit.prevent="registerSubmit" v-model="form">
          <VRow no-gutters>
            <VCol cols="12" class="mb-4">
              <VTextField
                label="Фамилия"
                v-model="formData.secondName"
                :rules="[required, minLength]"
              />
            </VCol>
            <VCol cols="12" class="mb-4">
              <VTextField label="Имя" v-model="formData.firstName" :rules="[required, minLength]" />
            </VCol>
            <VCol cols="12" class="mb-4">
              <VTextField
                label="Отчество"
                v-model="formData.thirdName"
                :rules="[required, minLength]"
              />
            </VCol>

            <VCol cols="12" class="mb-4">
              <VSelect
                label="Звание"
                variant="outlined"
                hide-details
                :items="['ассистент', 'доцент', 'старший преподаватель', 'профессор']"
                v-model="formData.category"
                :rules="[required]"
              />
            </VCol>

            <VCol cols="12" class="mb-4">
              <VTextField
                label="Почта"
                v-model="formData.email"
                :rules="[required, minLength, email]"
              />
            </VCol>

            <VCol cols="12" class="mb-4">
              <VTextField
                label="Пароль"
                v-model="formData.password"
                :type="isPasswordShown ? 'text' : 'password'"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="isPasswordShown = !isPasswordShown"
                :rules="[required, minLength]"
              />
            </VCol>

            <VCol cols="12" class="mb-2">
              <VBtn
                color="green"
                variant="flat"
                block
                height="50"
                type="submit"
                :loading="isRegisterLoading"
                :disabled="isRegisterLoading"
                >Зарегистрироваться</VBtn
              >
            </VCol>
            <VCol cols="12">
              <VBtn color="red" variant="flat" block height="50" type="reset">Сбросить</VBtn>
            </VCol>

            <VCol cols="12" v-if="isRegisterSuccess">
              <VBtn to="/login" color="orange" variant="flat" block height="50"
                >К странице авторизации</VBtn
              >
            </VCol>
          </VRow>
        </VForm>
      </VCardActions>
    </VCard>

    <img class="bg" src="../assets/Images/bg.jpg" alt="Фоновая картинка" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";
import useFormValidation from "@/composables/useFormValidation";

import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/responses";

const isPasswordShown = ref(false);
const formData = ref({
  firstName: "",
  secondName: "",
  thirdName: "",
  category: "доцент",
  email: "",
  password: "",
});

const isRegisterSuccess = ref(false);
const isRegisterFail = ref(false);
const registerErrorMessage = ref("");

const isRegisterLoading = ref(false);

const { form, minLength, email, required } = useFormValidation();

// const authStore = useAuthStore();

const router = useRouter();

const registerSubmit = async () => {
  if (!form.value) return;
  try {
    isRegisterLoading.value = true;
    await AuthService.register(formData.value);

    isRegisterSuccess.value = true;
    setTimeout(() => (isRegisterSuccess.value = false), 2500);
    setTimeout(() => router.push({ name: "login" }), 3050);
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;

    console.log(err);
    registerErrorMessage.value =
      err.response?.data.error || "Произошла ошибка при регистрации повторите попытку позже!";
    isRegisterFail.value = true;
    setTimeout(() => (isRegisterFail.value = false), 2500);
  }
  isRegisterLoading.value = false;
};
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
