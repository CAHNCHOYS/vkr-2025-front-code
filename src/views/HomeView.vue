<template>
  <div>
    <v-parallax
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      class="mb-10 pa-10 parallax"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h4 font-weight-thin mb-5 text-center text-wrap main-title">
          Разработка клиентского модуля вузовской системы дистанционного тестирования
        </h1>
        <h4 class="subheading main-title">
          Разработчик: Седых Алексей Андреевич, группа:
          <span class="font-weight-bold"> ПОИСм-23</span>
        </h4>
       
      </div>
    </v-parallax>
    <h2 class="text-h4 mb-8 text-center font-weight-bold adv-title">Возможности системы</h2>
    <v-row justify="center">
      <v-col
        v-for="advantage in advantages"
        md="4"
        sm="6"
        cols="12"
        :key="advantage.title"
        class="advantage-col"
      >
        <v-card color="white" class="pa-5" rounded="0" height="100%" elevation="8">
          <v-card-title class="text-center">
            <v-icon class="icon mb-2" :color="advantage.iconColor" :icon="advantage.icon" />
            <v-divider />
          </v-card-title>
          <v-card-text class="pt-2">
            <p class="text-h6 text-center mb-4">
              {{ advantage.title }}
            </p>

            <v-list>
              <v-list-item
                prepend-icon="mdi-check"
                density="compact"
                v-for="action in advantage.advantageActions"
              >
                <v-list-item-title class="text-wrap">{{ action }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";

type SystemAdvantages = {
  title: string;
  icon: string;
  iconColor: string;
  advantageActions: string[];
};

const advantages = ref<SystemAdvantages[]>([
  {
    title: "Работа с пользователями",
    icon: "mdi-human-male-board",
    iconColor: "blue",
    advantageActions: [
      "Аторизация преподавателя",
      "Регистрация преподателя",
      "Вывод сведений об аккаунте",
      "Сохранение всех данных ",
    ],
  },
  {
    title: "Работа с предметами",
    icon: "mdi-book-education-outline",
    iconColor: "light-green",
    advantageActions: ["Добавление предметов", "Удаление предметов", "Просмотр предметов"],
  },
  {
    title: "Работа с тестами",
    icon: "mdi-ab-testing",
    iconColor: "blue-grey",
    advantageActions: ["Создание тестов", "Удаление тестов", "Редактирование тестов"],
  },
  {
    title: "Работа с вопросами",
    icon: "mdi-help",
    iconColor: "brown",
    advantageActions: [
      "Создание вопросов",
      "Удаление вопросов",
      "Редактирование вопросов",
      "Изменение порядка вопросов",
    ],
  },
]);

onMounted(() => {
  gsap.from(".parallax", {
    opacity: 0,
    duration: 2,
    ease: "back.out",
  });

  gsap.from(".adv-title", {
    y: "-300",
    opacity: 0,
    duration: 0.5,
  });
  gsap.from(".advantage-col", {
    duration: 0.8,
    scale: 0,
    ease: "power3.out",
    opacity: 0,
    stagger: 0.5,
  });
});
</script>

<style lang="scss" scoped>
.icon {
  font-size: 80px !important;
}

.main-title {
  font-family: "Birthstone", cursive !important;
  font-weight: 400;
  font-style: normal;
}
</style>
