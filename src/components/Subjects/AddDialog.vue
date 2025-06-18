<template>
  <v-dialog :model-value="isActive" @update:model-value="$emit('closeDialog')" width="auto">
    <v-card min-width="500" elevation="5">
      <v-card-title class="text-h4 text-center mb-3">Добавление предмета</v-card-title>
      <v-card-text>
        <v-form class="w-100" @submit.prevent="addSubject">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="subject"
                placeholder="Название предмета"
                clearable
                class="w-100"
              />
            </v-col>
            <v-col cols="12">
              <v-btn variant="flat" color="green" type="submit" class="mr-4" :loading="isSubjectAdding">Добавить</v-btn>
              <v-btn variant="flat" color="red" @click="$emit('closeDialog')">Закрыть</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  isActive: boolean;
  isSubjectAdding: boolean;
}>();
const emit = defineEmits<{
  (e: "closeDialog"): void;
  (e: "addSubject", subject: string): void;
}>();

const subject = ref("");

const addSubject = async () => {
  console.log("submiting form");
  emit("addSubject", subject.value);
  subject.value = "";
};
</script>
