import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ChatRoom from "@/views/ChatRoom.vue";
import { auth } from "@/firebase/config";

const authControl = (to, from, next) => {
  const kullanici = auth.currentUser;

  if (!kullanici) {
    next({ name: "home" });
  } else {
    next();
  }
};

const chatKontrol = (to, from, next) => {
  const kullanici = auth.currentUser;

  if (kullanici) {
    next({ name: "ChatRoom" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: chatKontrol,
    },
    {
      path: "/chat",
      name: "ChatRoom",
      component: ChatRoom,
      beforeEnter: authControl,
    },
  ],
});

export default router;
