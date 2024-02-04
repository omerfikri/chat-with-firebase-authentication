import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const kullanici = ref(auth.currentUser);

onAuthStateChanged(auth, (k) => {
  console.log(k);
  kullanici.value = k;
});

const getUser = () => {
  return { kullanici };
};

export default getUser;
