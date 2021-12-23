<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <div class="ion-padding">{{ store.error }}</div>
            <form class="login-form">
                <ion-item lines="full">
                    <ion-label position="floating">Email</ion-label>
                    <ion-input v-model="email" type="text" required></ion-input>
                </ion-item>
                <ion-item lines="full">
                    <ion-label position="floating">Password</ion-label>
                    <ion-input v-model="password" type="password" required></ion-input>
                </ion-item>
                <ion-button expand="block" @click="doLogin">Log In</ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useAuthStore } from "@/store";
import {
    IonLabel,
    IonInput,
    IonButton,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
    name: "LoginPage",
    components: {
        IonLabel,
        IonInput,
        IonButton,
        IonItem,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonPage,
    },
    setup() {
        const store = useAuthStore();
        const { logInUser } = store;
        const router = useRouter();
        const email = ref("");
        const password = ref("");

        const doLogin = async () => {
            await logInUser(email.value, password.value);
            router.replace("/tabs/tab1");
        };
        return { email, password, doLogin, store };
    },
});
</script>

<style lang="css" scoped></style>
