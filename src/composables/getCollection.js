import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";

const getCollection = (koleksiyon) => {
  const docs = ref(null);
  const hata = ref(null);

  let koleksiyonRef = collection(db, koleksiyon);
  const q = query(koleksiyonRef, orderBy("olusturulmaTarihi", "asc"));

  onSnapshot(
    q,
    (snap) => {
      let result = [];
      snap.docs.forEach((doc) => {
        doc.data().olusturulmaTarihi &&
          result.push({ ...doc.data(), id: doc.id });
      });
      docs.value = result;
      hata.value = null;
    },
    (err) => {
      docs.value = null;
      hata.value = "veriler çekilemedi";
    }
  );

  return { hata, docs };
};

export default getCollection;
