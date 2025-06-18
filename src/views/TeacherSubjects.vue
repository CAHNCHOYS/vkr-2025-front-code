<template>
  <h2 class="text-h2 mb-7">Мои предметы</h2>

  <v-progress-linear v-if="subjectStore.isActionLoading" height="10" color="indigo" indeterminate />
  <div v-else>
    <v-alert v-if="subjectStore.isSubjectLoadError" type="error" variant="flat" class="w-100"
      >Ошибка при загрузке предметов, повторите попытку позже!</v-alert
    >

    <SubjectsTable
      :subjects="subjectStore.teacherSubjects"
      @open-dialog="isAddFormShown = true"
      @delete-subjects="deleteTeacherSubjects"
      :is-subjects-deleting="subjectStore.isActionLoading"
      v-else
    />
  </div>

  <AddDialog
    :is-active="isAddFormShown"
    :is-subject-adding="subjectStore.isActionLoading"
    @close-dialog="isAddFormShown = false"
    @add-subject="addSubject"
  />

  <v-snackbar :model-value="subjectStore.isActionSuccess" location="top" color="green">
    <div class="text-h6">Прдемет успешно был добавлен!</div>
  </v-snackbar>

  <v-snackbar :model-value="subjectStore.isSubjectActionError" location="top" color="red">
    <div class="text-h6">Ошибка: {{ subjectStore.subjectActionErrorMessage }}</div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSubjectStore } from "@/stores/subjects";
import { useAuthStore } from "@/stores/auth";

import AddDialog from "../components/Subjects/AddDialog.vue";
import SubjectsTable from "@/components/Subjects/SubjectsTable.vue";

const isAddFormShown = ref(false);

const subjectStore = useSubjectStore();
const authStore = useAuthStore();

const addSubject = async (subjectname: string) => {
  await subjectStore.addSubject(authStore.currentTeacher!.id, subjectname);
};

const deleteTeacherSubjects = async (subjectsId: number[]) => {
  subjectStore.isActionLoading = true;

  for (const subjectId of subjectsId) {
    await subjectStore.deleteSubject(subjectId);
  }

  subjectStore.isActionLoading = false;
};

onMounted(async () => {
  await subjectStore.loadAllSubjects(authStore.currentTeacher!.id);
});
</script>

<style lang="scss" scoped></style>
