<template>
  <v-row>
    <v-col cols="auto"
      ><v-btn icon="mdi-arrow-left" @click="emit('changeQuestion', -1)" :disabled="isFirst" color="red"></v-btn
    ></v-col>
    <v-spacer></v-spacer>
    <v-col v-if="!isLast" cols="auto"
      ><v-btn icon="mdi-arrow-right" @click="emit('changeQuestion', 1)" color="green"></v-btn
    ></v-col>
    <v-col v-else cols="auto"
      ><v-btn @click="emit('changeQuestion', 1)" variant="outlined" color="red"
        >Закончить тест</v-btn
      ></v-col
    >
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  isFirst: boolean;
  isLast: boolean;
}>();
const emit = defineEmits<{
  (e: "changeQuestion", index: number): void;
}>();
</script>
