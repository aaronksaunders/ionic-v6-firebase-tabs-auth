<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>{{ authStore.user?.email }}</h1>
      <ion-button @click="doLogout">LOGOUT</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  name : 'Tab-1',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter()
    const doLogout = async () => {
      await authStore.logoutUser();
      router.replace("/login");
    }
    return {
      doLogout, authStore
    }
  }
})
</script>