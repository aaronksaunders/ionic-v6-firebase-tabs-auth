<template>
  <ion-page>
    <ion-header>
      <ion-toolbar> <ion-title>User Profile</ion-title> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <IonGrid style="background-color: antiquewhite; border-radius: 8px; padding: 8px">
        <IonRow>
          <IonCol>
            <div style="font-weight: bold; font-size: x-large">
              {{ profile.first }} {{ profile.last }}
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div style="font-weight: bold; font-size: large">{{ user?.email }}</div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <p style="font-size: small; color: lightslategrey; font-weight: bold;">Last Login:&nbsp;{{user?.metadata?.lastSignInTime}}</p>
            <ion-button @click="doLogout">LOGOUT</ion-button>
          </IonCol>
        </IonRow>
      </IonGrid>
      <!-- {{ profile }} -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import router from "@/router";
import { useAuthStore } from "@/store";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const { logoutUser, user, profile } = useAuthStore();
    /**
     *
     */
    const doLogout = async () => {
      await logoutUser();
      router.replace("/login");
    };

    return {
      doLogout,
      user,
      profile,
    };
  },
});
</script>
