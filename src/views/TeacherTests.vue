<template>
  <h2 class="text-h2 mb-8 font-weight-bold">Созданные тесты</h2>

  <div v-if="testStore.isTestsLoading">
    <v-progress-linear height="10" color="primary" indeterminate></v-progress-linear>
  </div>
  <div v-else>
    <v-alert type="error" v-if="testStore.isTestsLoadError"
      >Ошибка при загрузки тестов, попробуйте позже!</v-alert
    >
    <v-row v-else-if="testStore.teacherTests.length">
      <v-col v-for="(test, index) in testStore.teacherTests" :key="test.id"  sm="6" md="4" cols="12">
        <v-card
          elevation="4"
          class="pb-2 h-100 d-flex flex-column rounded-0"
          :disabled="testStore.isActionLoading"
        >
          <v-toolbar height="65" color="indigo">
            <v-toolbar-title>№ {{ index + 1 }}</v-toolbar-title>
            <v-spacer />
            <v-tooltip
              text="Удалить тест"
              location="bottom center"
              content-class="bg-red text-white"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  @click="() => testStore.deleteTeacherTest(test.id)"
                  color="white"
                  icon="mdi-delete"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-toolbar>
          <v-card-title>
            Название:
            <span class="font-weight-bold">{{ test.name }}</span></v-card-title
          >
          <v-card-text class="flex-grow-1">
            <v-divider class="border-opacity-100" color="grey" />
            <p class="pt-4 pb-4 text-h6">
              Предмет: {{ test.subjectName || "Обновите для получения данных" }}
            </p>
            <v-divider class="border-opacity-100" color="grey" />
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              :to="getTestLink(test.id)"
              block
              variant="flat"
              color="green"
              prepend-icon="mdi-link-variant"
              >Перейти к тесту</v-btn
              @click.prevent="copyLink"
            >
            <v-btn
              :to="`/tests/edit/${test.id}`"
              block
              variant="flat"
              color="blue"
              prepend-icon="mdi-pencil"
              >Изменить тест</v-btn
            >
            <v-btn
              :to="`/results/${test.id}`"
              block
              variant="flat"
              color="deep-purple-lighten-1"
              prepend-icon="mdi-account-school-outline"
              >Результаты</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert type="warning" v-else>
      <p class="text-h6 mb-1">Вы пока не создали ни одного теста!</p>
      <p>
        <v-btn to="/tests" variant="outlined" color="white" prepend-icon="mdi-plus"
          >Перейти к созданию</v-btn
        >
      </p>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import {  onMounted } from "vue";
import { useTestStore } from "@/stores/tests";
import { useAuthStore } from "@/stores/auth";

const testStore = useTestStore();
const authStore = useAuthStore();

const getTestLink = (testId: number) => {
  return `/tests/${authStore.currentTeacher!.id}/${testId}`;
};



onMounted(async () => {
  await testStore.loadAllTeacherTests(authStore.currentTeacher!.id);
});
</script>

<style lang="scss" scoped></style>
