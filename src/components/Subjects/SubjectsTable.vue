<template>
  <v-card elevation="8" rounded="0" class="pa-0">
    <v-card-text class="pa-0">
      <v-sheet class="pa-5">
        <v-text-field v-model="searchQuery" placeholder="Поиск предмета" />
      </v-sheet>

      <v-toolbar height="70" :color="getSelectedRowsLength ? 'brown' : 'blue-grey'" class="px-3">
        <v-btn v-if="getSelectedRowsLength" @click="cancelSelections" icon="mdi-close" />
        <v-toolbar-title v-if="!getSelectedRowsLength"> Ваши предметы </v-toolbar-title>
        <v-toolbar-title v-else> Всего выбрано : {{ getSelectedRowsLength }} </v-toolbar-title>

        <v-tooltip text="Добавить предмет" location="bottom" content-class="bg-green text-white">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-plus" @click="$emit('openDialog')" v-bind="props"> </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip
          text="Удалить выделенные"
          location="bottom center"
          content-class="bg-red text-white"
        >
          <template v-slot:activator="{ props }">
            <v-badge
              v-if="getSelectedRowsLength"
              :content="getSelectedRowsLength"
              color="red"
              offset-x="10"
              offset-y="10"
            >
              <v-btn
                @click="emitSubjectsDelition"
                :loading="isSubjectsDeleting"
                icon="mdi-trash-can"
                v-bind="props"
              />
            </v-badge>
          </template>
        </v-tooltip>
      </v-toolbar>
      <v-table density="comfortable">
        <thead v-if="getSearchedSubjects.length">
          <tr>
            <th class="text-h6 text-left text-black"></th>
            <th class="text-left text-h6 text-black">Название предмета</th>
          </tr>
        </thead>
        <tbody v-if="getSearchedSubjects.length">
          <SubjectTableRow
            v-for="subject in getSearchedSubjects"
            :key="subject.id"
            :subject="subject"
            :cancel-selection="cancelAllSelectinos"
            @select-row="addSelection"
          />
        </tbody>
        <tbody v-else>
          <tr>
            <th class="text-subtitle-1 text-left text-red pl-8">Предметов не найдено(</th>
            <th class="text-left text-h6 text-black"></th>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import SubjectTableRow from "./SubjectTableRow.vue";

import type { ISubject } from "@/types/core";

const props = defineProps<{
  subjects: ISubject[];
  isSubjectsDeleting: boolean;
}>();

const emit = defineEmits<{
  (e: "openDialog"): void;
  (e: "deleteSubjects", subjects: number[]): void;
}>();

const searchQuery = ref("");

const selectedRows = ref<number[]>([]);
const cancelAllSelectinos = ref(false);
const getSelectedRowsLength = computed(() => {
  return selectedRows.value.length;
});

const getSearchedSubjects = computed(() => {
  return props.subjects.filter((subject) => subject.name.includes(searchQuery.value));
});

const cancelSelections = () => {
  cancelAllSelectinos.value = true;
  selectedRows.value = [];
};

const emitSubjectsDelition = () => {
  emit("deleteSubjects", selectedRows.value);
  selectedRows.value = [];
};

const addSelection = (subjectId: number, isSelected: boolean) => {
  cancelAllSelectinos.value = false;
  if (isSelected) {
    selectedRows.value.push(subjectId);
  } else {
    selectedRows.value = selectedRows.value.filter((currentId) => currentId !== subjectId);
  }
};
</script>

<style lang="scss" scoped></style>
