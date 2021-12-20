<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>{{ authStore.user?.email }}</h1>
      <pre>{{ JSON.stringify(imageStore?.images, null, 1) }}</pre>
      <ion-button @click="doLogout">LOGOUT</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useAuthStore, useImageStore } from '@/store';
import { useRouter } from 'vue-router'
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  name: 'Tab-1',
  setup() {
    const authStore = useAuthStore();
    const imageStore = useImageStore();
    const router = useRouter()


    onMounted(async () => {
      await imageStore.initializeCollectionListener("ImageInfo")
    })
    /**
     * 
     */
    const doLogout = async () => {
      await authStore.logoutUser();
      router.replace("/login");
    }
    return {
      doLogout, authStore, imageStore
    }
  }
})
</script>