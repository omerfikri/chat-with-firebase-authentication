<template>
  <form @submit.prevent="uyeOl">
    <h4>Üye Olma Ekranı</h4>
    <input
      type="text"
      placeholder="Kullanıcı Adını Giriniz"
      v-model="kullaniciAd"
    />
    <input type="text" placeholder="Email Giriniz" v-model="email" />
    <input type="password" placeholder="Parola Giriniz" v-model="parola" />
    <button>Kayıt Ol</button>
  </form>
  <div class="error">
    {{ hata }}
  </div>
</template>

<script>
  import { ref } from "vue";
  import useRegister from "../composables/useRegister";

  export default {
    emits: ["register"],
    setup(props, context) {
      const kullaniciAd = ref("");
      const email = ref("");
      const parola = ref("");

      const { hata, signup } = useRegister();

      const uyeOl = async () => {
        await signup(email.value, parola.value, kullaniciAd.value);
        if (!hata.value) {
          context.emit("register");
        }
      };
      return { uyeOl, kullaniciAd, email, parola, hata };
    },
  };
</script>

<style></style>
