<template>
  <div>
    <v-row align="center">
      <v-col v-if="isEditable" cols="auto">
        <div class="mb-2">
          <v-btn @click="emit('moveQuestion', 'up')" icon="mdi-arrow-up" color="green" />
        </div>

        <div>
          <v-btn @click="emit('moveQuestion', 'down')" icon="mdi-arrow-down" color="red" />
        </div>
      </v-col>
      <v-col cols="auto" class="flex-1-1">
        <h3 class="text-h6 mb-4">{{ text }}</h3>
        <div v-if="type == 'multiply'">
          <v-checkbox
            v-for="answer in answers"
            :key="answer"
            :value="answer"
            :label="answer"
            hide-details
            :model-value="userAnswer"
            disabled
          />
        </div>
        <div v-else-if="type == 'single'">
          <v-radio-group
            disabled
            :model-value="userAnswer"
            :inline="false"
            class="d-flex flex-column"
          >
            <v-radio v-for="answer in answers"  :key="answer" :label="answer" :value="answer" />
          </v-radio-group>
        </div>
        <div v-else="type == 'text'">
          <v-text-field disabled :model-value="userAnswer" label="Ответ на вопрос" />
        </div>
      </v-col>

      <v-col v-if="isEditable" cols="auto">
        <v-btn @click="emit('editQuestion')" icon="mdi-pencil" color="blue" class="mr-4" />
        <v-btn @click="emit('deleteQuestion')" icon="mdi-trash-can" color="red" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  type: string;
  answers?: string[];
  userAnswer: string[] | string;
  isEditable: boolean;
}>();

const emit = defineEmits<{
  (e: "answerQuestion", answer: string, index: number): void;
  (e: "updateAnswer", answer: string): void;
  (e: "moveQuestion", direction: "up" | "down"): void;
  (e: "deleteQuestion"): void;
  (e: "editQuestion"): void;
}>();
</script>
