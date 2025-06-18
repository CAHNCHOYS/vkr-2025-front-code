<template>
  <h3 class="text-h5 mb-8">Выберете предмет для создания теста</h3>
  <v-select
    :items="subjects"
    v-model="selectedSubjectId"
    item-title="name"
    item-value="id"
    label="Ваши предметы"
    no-data-text="Нет предметов"
    variant="outlined"
    auto-select-first
    class="mb-4"
  />

  <v-btn @click="$emit('selectSubject', selectedSubjectId)" color="green">Продолжить</v-btn>
</template>

<script setup lang="ts">
import type { ISubject } from "@/types/core";
import { ref } from "vue";

const props = defineProps<{
  subjects: ISubject[];
}>();

const emit = defineEmits<{
  (e: "selectSubject", id: number): void;
}>();

const selectedSubjectId = ref<number>(props.subjects[0].id);
</script>

<style lang="scss" scoped></style>
