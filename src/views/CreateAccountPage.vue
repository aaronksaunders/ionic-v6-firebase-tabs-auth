<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Create Account Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <div class="ion-padding">{{ store.error }}</div>
            <form class="login-form" autocomplete="off">
                <ion-item lines="full">
                    <ion-label position="floating">First Name</ion-label>
                    <ion-input v-model="first" type="text" id="first" name="first"  autocomplete="off"></ion-input>
                </ion-item>
                <ion-item lines="full">
                    <ion-label position="floating">Last Name</ion-label>
                    <ion-input v-model="last" type="text" id="last"  name="last"  autocomplete="off"></ion-input>
                </ion-item>
                <ion-item lines="full">
                    <ion-label position="floating">Email</ion-label>
                    <ion-input v-model="email" type="email"  ></ion-input>
                </ion-item>
                <ion-item lines="full">
                    <ion-label position="floating">Password</ion-label>
                    <ion-input v-model="password" type="password"   autocomplete="new-password"></ion-input>
                </ion-item>
                <ion-button expand="block" @click="doCreateAccount">Create Account</ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useAuthStore } from "@/store"
import { IonLabel, IonInput, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";
export default {
    name: 'LoginPage',
    components: { IonLabel, IonInput, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonPage },
    setup() {
        const store = useAuthStore()
        const router = useRouter()
        const email = ref('');
        const password = ref('');
        const first = ref('');
        const last = ref('');

        /**
         * 
         */
        const doCreateAccount = async () => {
            await store.createAccount(email.value, password.value, first.value, last.value);
            router.replace("/tabs/tab1");
        }
        return { email, password, doCreateAccount, store, first, last }
    }
}
</script>

<style lang="css" scoped>
</style>