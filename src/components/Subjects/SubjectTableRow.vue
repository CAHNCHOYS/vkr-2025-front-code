<template>
  <tr
    style="cursor: pointer"
    @click="isSelected = !isSelected"
    :class="isSelected ? 'bg-cyan-lighten-5' : ''"
  >
    <td class="pr-10"><v-checkbox v-model="isSelected" color="grey" /></td>
    <td class="w-100">{{ subject.name }}</td>
  </tr>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { ISubject } from "@/types/core";

const props = defineProps<{
  subject: ISubject;
  cancelSelection: boolean;
}>();

const isSelected = ref(false);

const emit = defineEmits<{
  (e: "selectRow", id: number, isSelected: boolean): void;
}>();

watch(isSelected, () => {
  emit("selectRow", props.subject.id, isSelected.value);
});

watch(
  () => props.cancelSelection,
  () => {
    if (props.cancelSelection) isSelected.value = false;
  },
);
</script>

<style lang="scss" scoped></style>
