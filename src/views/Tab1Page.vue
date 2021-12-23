<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>Welcome: {{ authStore.user?.email }}</h1>
      <!-- <pre>{{ JSON.stringify(imageStore?.images, null, 1) }}</pre> -->
      <ion-list>
        <ion-item v-for="image in imageStore?.images" :key="image.uid">
          <ion-avatar slot="start" style="width: 80px; height: 80px">
            <img :src="image.url" />
          </ion-avatar>
          <ion-label>
            <h2>{{ image.name }}</h2>
            <h3>{{ image.imageData.size }} {{ image.imageData.contentType }}</h3>
            <p>{{ image.imageData?.updated && new Date(image.imageData?.updated)?.toLocaleDateString() }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel } from '@ionic/vue';
import { useAuthStore, useImageStore } from '@/store';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel },
  name: 'Tab-1',
  setup() {
    const authStore = useAuthStore();
    const imageStore = useImageStore();


    onMounted(async () => {
      await imageStore.initializeCollectionListener("ImageInfo")
    })

    return {
      authStore, imageStore
    }
  }
})
</script>