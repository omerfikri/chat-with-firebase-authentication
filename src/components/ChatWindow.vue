<template>
  <div class="chat-window">
    <div v-if="hata">{{ hata }}</div>
    <div v-if="docs" class="messages" ref="mesajlar">
      <div v-for="doc in duzenlenmisBelgeler" :key="doc.id">
        <div v-if="doc.kullanici == nickName" class="yourself">
          <span class="created-at">{{ doc.olusturulmaTarihi }}</span>
          <span class="name">{{ doc.kullanici }}</span>
          <br />
          <span style="text-decoration: none">{{ doc.mesaj }}</span>
        </div>
        <div v-else class="other">
          <span class="created-at">{{ doc.olusturulmaTarihi }}</span>
          <span class="name">{{ doc.kullanici }}</span>
          <br />
          <span style="text-decoration: none">{{ doc.mesaj }}</span>
        </div>
      </div>
    </div>
    <div v-else>Mesajlarınız Yükleniyor</div>
  </div>
</template>

<script>
  import getCollection from "../composables/getCollection";
  import { computed, ref, onUpdated } from "vue";
  import { formatDistanceToNow } from "date-fns";
  import { auth } from "../firebase/config";
  export default {
    setup() {
      const { hata, docs } = getCollection("mesajlar");
      const kullanici = ref(auth.currentUser);
      const nickName = kullanici.value.displayName;

      const duzenlenmisBelgeler = computed(() => {
        if (docs.value) {
          return docs.value.map((doc) => {
            let zaman = formatDistanceToNow(doc.olusturulmaTarihi.toDate());
            return { ...doc, olusturulmaTarihi: zaman };
          });
        }
      });

      const mesajlar = ref(null);

      onUpdated(() => {
        mesajlar.value.scrollTop = mesajlar.value.scrollHeight;
      });

      return { hata, docs, duzenlenmisBelgeler, mesajlar, nickName };
    },
  };
</script>

<style scoped>
  .other {
    margin: 18px 20px;
  }
  .yourself {
    margin: 18px 20px;
    text-align: right;
  }
</style>
