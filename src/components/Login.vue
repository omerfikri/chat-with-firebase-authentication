<template>
  <form @submit.prevent="girisYap">
    <h4>Giriş Ekranı</h4>

    <input type="text" placeholder="Email Giriniz" v-model="email" />
    <input type="password" placeholder="Parola Giriniz" v-model="parola" />
    <button>Giriş</button>
  </form>
  <div class="error">
    {{ hata }}
  </div>
</template>

<script>
  import { ref } from "vue";
  import useLogin from "@/composables/useLogin";
  export default {
    emits: ["login"],
    setup(props, context) {
      const email = ref("");
      const parola = ref("");

      const { hata, login } = useLogin();

      const girisYap = async () => {
        login(email.value, parola.value);
        if (!hata.value) {
          context.emit("login");
        }
      };

      return { email, parola, girisYap, hata };
    },
  };
</script>

<style></style>
