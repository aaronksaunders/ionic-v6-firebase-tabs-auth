import { User as fbUser } from "firebase/auth";
import { defineStore } from "pinia";
import {
  fbAuthStateListener,
  fbCreateAccount,
  fbGetUserProfile,
  fbSignIn,
  fbSignOut,
} from "./firebase";

export interface User {
  user: any;
  profile: any;
  userError: any;
}

interface State {
  user: fbUser | null;
  profile: any;
  error: null;
}


export const useAuthStore = defineStore("authStore", {
  // convert to a function
  state: (): State => ({
    user: null,
    profile: null,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    userError: (state) => state.error,
  },
  actions: {
    /**
     * listens for state changes, ie a user logging in or out
     * and if logging in, loading the associated profile info
     * @returns
     */
    initializeAuthListener() {
      return new Promise((resolve) => {
        fbAuthStateListener(async (user: any) => {
          this.user = user ? user : null;

          if (user) {
            const profile = (await fbGetUserProfile()) as any;
            this.profile = profile;
          }
          resolve(true);
        });
      });
    },
    /**
     *
     * @param data
     */
    async logInUser(email: string, password: string) {
      try {
        const response = await fbSignIn(email, password);
        this.user = response.user ? response.user : null;
        this.error = null;
        return true;
      } catch (e: any) {
        this.user = null;
        this.error = e;
        return false;
      }
    },
    /**
     *
     * @param data
     */
    async logoutUser() {
      try {
        await fbSignOut();
        this.user = null;
        this.profile = null;
        this.error = null;
        return true;
      } catch (e: any) {
        this.error = e;
        return false;
      }
    },


    /**
     *
     * @param data
     */
     async createAccount(email: string, password: string, first: string, last: string) {
        try {
          const {user, profile} = await fbCreateAccount(email, password, first,last);
          this.user = user ? user : null;
          this.profile = profile ? profile : null;
          this.error = null;
          return true;
        } catch (e: any) {
          this.user = null;
          this.error = e;
          return false;
        }
      },
  },
});
