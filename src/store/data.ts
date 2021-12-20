import { defineStore } from "pinia";
import { fbCollectionListener, queryObjectCollection } from "./firebase";

interface State {
  images: any[] | null;
  error: null;
}

export const useImageStore = defineStore("imageStore", {
  // convert to a function
  state: (): State => ({
    images: [],
    error: null,
  }),
  getters: {
    allImages: (state) => state.images,
    imageError: (state) => state.error,
  },
  actions: {
      /**
       * listen for changes on collection and update
       * store.
       * 
       * @param collectionName 
       * @returns 
       */
    initializeCollectionListener(collectionName: string) {
      return new Promise((resolve) => {
        fbCollectionListener(collectionName, async (data: any) => {
          this.images = data ? data : null;
          this.error = null;
          resolve(true);
        });
      });
    },
    /**
     * make intentional call to load images for collectsion
     * 
     * @param data
     */
    async loadImages() {
      try {
        const data = await queryObjectCollection({
          collectionName: "ImageInfo",
        });
        this.images = data ? data : null;
        this.error = null;
        return this.images;
      } catch (e: any) {
        this.images = null;
        this.error = e;
        return false;
      }
    },
  },
});
