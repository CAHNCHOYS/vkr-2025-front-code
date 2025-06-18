<template>
  <div class="d-flex justify-center align-center h-100 pa-8 overflow-auto">
    <v-card
      max-width="800"
      class="pa-8 flex-grow-1 rounded-0 overflow-auto"
      variant="flat"
      elevation="15"
      style="z-index: 100"
      :loading="testStore.isTestsLoading"
    >
      <v-card-title class="mb-8 text-h5 d-flex align-center">
        <v-tooltip
          text="Копировать ссылку на тест"
          location="bottom center"
          content-class="bg-blue-grey"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              @click="copyCurrentLink"
              v-bind="props"
              icon="mdi-link-box-outline"
              color="blue"
              class="mr-4"
            />
          </template>
        </v-tooltip>
        {{ testStore.editingTestName }}
      </v-card-title>
      <v-card-text v-if="!testStore.isTestsLoadError">
        <div v-if="!isTestStarted">
          <v-text-field v-model="studentName" label="Введите ФИО" class="mb-4" />
          <v-btn height="50" color="green" @click="startTest">Начать тест</v-btn>
        </div>

        <StudentTestQuestions
          :questions="testStore.getSortedTestQuestions"
          :student-name="studentName"
          v-else
        />
      </v-card-text>
      <v-card-text v-else>
        <v-alert type="error"> Ошибка при загрузки теста, повторите попытку ! </v-alert>
      </v-card-text>
    </v-card>

    <img class="bg" src="../assets/Images/bg3.jpg" alt="Фоновая картинка" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import StudentTestQuestions from "@/components/StudentTestPassing.vue";
import { useTestStore } from "@/stores/tests";

const testStore = useTestStore();
const route = useRoute();

const studentName = ref("");
const isTestStarted = ref(false);

const copyCurrentLink = () => {
  navigator.clipboard.writeText(window.location.href);
};

const startTest = () => {
  console.log("Trying");
  if (studentName.value.length < 5) return;
  isTestStarted.value = true;
};

onMounted(async () => {
  await testStore.loadSingleTest(+route.params.testId);
});
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
