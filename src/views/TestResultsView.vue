<template>
  <div>
    <h2 class="text-h3 mb-8">Результаты теста</h2>

    <div v-if="isResultsLoading">
      <v-progress-linear height="10" color="primary" indeterminate></v-progress-linear>
    </div>
    <div v-else-if="!isResultsLoadError">
      <v-card class="pa-0 rounded-0" elevation="10">
        <v-card-text class="pa-0">
          <div class="pt-6 pl-6 pr-6 mb-6">
            <v-text-field v-model="searchedName" label="ФИО студента" />
          </div>

          <v-table fixed-header>
            <thead>
              <tr class="text-subtitle-1">
                <th class="text-left font-weight-bold">ФИО студента</th>
                <th class="text-left font-weight-bold">Набранный балл</th>
                <th class="text-left font-weight-bold">Максимальный балл</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="results in getSearchedStudents" :key="results.id">
                <td class="w-50">{{ results.studentName }}</td>
                <td class="w-25">{{ results.studentMark }}</td>
                <td class="w-25">{{ results.maxMark }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-alert type="error" class="text-h6"
        >Ошибка при загрузке результатов теста, попробуйте обновить страницу!</v-alert
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import testService from "@/services/testService";
import type { ITestResult } from "@/types/core";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const testResults = ref<ITestResult[]>([]);

const isResultsLoading = ref(false);
const isResultsLoadError = ref(false);

const route = useRoute();
const searchedName = ref("");

const getSearchedStudents = computed(() =>
  testResults.value.filter((res) => res.studentName.includes(searchedName.value)),
);

onMounted(async () => {
  try {
    isResultsLoading.value = true;
    testResults.value = await testService.getTestResults(+route.params.testId);
  } catch (error) {
    console.log(error);
    isResultsLoadError.value = true;
  }
  isResultsLoading.value = false;
});
</script>
