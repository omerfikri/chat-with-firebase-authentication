import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const hata = ref(null);

const login = async (email, parola) => {
  hata.value = null;
  try {
    const res = await signInWithEmailAndPassword(auth, email, parola);
    if (!res) {
      throw new Error("Login İşlemi Gerçekleşmedi");
    }

    hata.value = null;
    return res;
  } catch (error) {
    hata.value = error.message;
  }
};

const useLogin = () => {
  return { hata, login };
};
export default useLogin;
