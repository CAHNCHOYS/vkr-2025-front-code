<template>
  <div class="d-flex align-center flex-column">
    <v-img :width="400" aspect-ratio="16/9" cover src="../assets/Images/404.jpg"></v-img>
    <div class="font text-h6 mb-2 font-weight-bold">Старница которую вы ищете не существует!</div>
    <div class="font text-subtitle-1">Попробуйте перейти на другую страницу!</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.font {
  font-family: "Birthstone", cursive !important;
  font-weight: 400;
  font-style: normal;
}
</style>
