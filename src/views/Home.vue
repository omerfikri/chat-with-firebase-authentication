<template>
  <div class="home container">
    <h2>Chat App</h2>
    <div v-if="uyeMi">
      <Login @login="chatStart" />
      <p>
        Kayıt olmak İçin <span @click="uyeMi = false">Kayıt Ol</span> Sayfasına
        Gidiniz
      </p>
    </div>
    <div v-else>
      <Register @register="chatStart" />
      <p>
        Giriş Yapmak İçin <span @click="uyeMi = true">Giriş Yap</span> Sayfasına
        Gidiniz
      </p>
    </div>
  </div>
</template>

<script>
  import Register from "../components/Register.vue";
  import Login from "../components/Login.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  export default {
    name: "Home",
    components: {
      Register,
      Login,
    },
    setup() {
      const router = useRouter();
      const uyeMi = ref(true);
      const chatStart = () => {
        router.push({ name: "ChatRoom" });
      };
      return { uyeMi, chatStart };
    },
  };
</script>

<style scoped>
  .home {
    text-align: left;
    padding: 20px 50px;
  }
</style>
