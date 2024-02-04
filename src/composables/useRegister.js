import { ref } from "vue";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const hata = ref(null);

const signup = async (email, parola, kullaniciAd) => {
  hata.value = null;
  try {
    if (kullaniciAd.trim() === "") {
      throw new Error("Kullanıcı adı boş geçilemez");
    }
    const res = await createUserWithEmailAndPassword(auth, email, parola);
    if (!res) {
      throw new Error("Register İşlemi Gerçekleşmedi");
    }

    updateProfile(auth.currentUser, {
      displayName: kullaniciAd,
    });

    hata.value = null;
    return res;
  } catch (error) {
    hata.value = error.message;
  }
};

const useRegister = () => {
  return { hata, signup };
};
export default useRegister;
