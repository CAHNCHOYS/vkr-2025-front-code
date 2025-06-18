import { ref } from "vue";

export default function useFormValidation() {
  function required(v: string) {
    return !!v || "Поле обязательное для ввода!";
  }

  function minLength(v: string) {
    return v.length > 2 || "Слишком мало символов!";
  }

  function email(v: string) {
    return v.includes("@") || "Введите корректный email";
  }


  const form = ref(false);

  return {
    form,
    required,
    minLength,
    email,
  };
}
