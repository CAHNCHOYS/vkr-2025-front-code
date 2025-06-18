<template>
  <v-row align="center" no-gutters class="mb-2 pa-2" :class="isSelected ? 'bg-grey-lighten-4' : ''">
    <v-col cols="10">
      <v-text-field
        v-model.lazy="answerText"
        @update:model-value="updateCurrentAnswer"
        variant="underlined"
        label="Текст ответа"
      >
      </v-text-field>
    </v-col>
    <v-col class="d-flex justify-center" cols="1">
      <v-tooltip
        text="Сделать правильным"
        content-class="bg-green text-white"
        location="bottom center"
      >
        <template v-slot:activator="{ props }">
          <v-checkbox
            v-model="isSelected"
            @update:model-value="updateCurrentAnswer"
            v-bind="props"
            color="green"
          />
        </template>
      </v-tooltip>
    </v-col>
    <v-col class="d-flex justify-center" cols="1">
      <v-btn @click="$emit('deleteAnswer', id)" icon="mdi-trash-can" color="red" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  id: number;
  selectedId: number;
  text?: string;
  isSelected?: boolean;
}>();
const emit = defineEmits<{
  (e: "updateAnswer", answerText: string, isRight: boolean, id: number): void;
  (e: "deleteAnswer", id: number): void;
}>();

const answerText = ref(props.text || "");

const isSelected = ref(props.isSelected || false);

const updateCurrentAnswer = () => {
  emit("updateAnswer", answerText.value, isSelected.value, props.id);
};

watch(
  () => props.selectedId,
  () => {
    if (props.selectedId === props.id) {
      isSelected.value = true;
    } else {
      isSelected.value = false;
    }
  },
);
</script>

<style lang="scss" scoped></style>
