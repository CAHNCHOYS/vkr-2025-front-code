import { ref } from "vue";

export default function useMenuItems() {
  type MenuItem = {
    text: string;
    link: string;
    icon?: string;
  };

  const defaultMenuItems = ref<MenuItem[]>([
    {
      text: "Главная",
      link: "/",
    },

    {
      text: "Мои тесты",
      link: "/my-tests",
      icon: "mdi-ab-testing",
    },
    {
      text: "Мои предметы",
      link: "/teacher-subjects",
      icon: "mdi-book-edit",
    },
    {
      text: "Создать тест",
      link: "/create-test",
      icon: "mdi-plus",
    },
  ]);

  return {
    defaultMenuItems,
  };
}
