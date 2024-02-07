import { ref } from "vue";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const useCollection = (koleksiyon) => {
  let hata = ref(null);

  const addDocument = async (doc) => {
    hata.value = null;

    try {
      await addDoc(collection(db, koleksiyon), doc);
    } catch (error) {
      hata.value = error.message;
    }
  };

  return { hata, addDocument };
};

export default useCollection;
