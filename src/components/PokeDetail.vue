<template>
  <nav>
    <router-link to="/">Go Home</router-link>
  </nav>
  <LoaderGeneric v-if="isLoad" />
  <div
    v-if="info"
    class="grid flex flex-wrap justify-content-center align-items-center"
  >
    <div class="flex-row justify-content-center align-items-center">
      <div class="flex flex-column flex-wrap">
        <img class="image-tam" :src="image" />
        <h2>{{ info.name }}</h2>
      </div>
      <div class="flex flex-column">
        <p>HP: {{ info.stats[0].base_stat }}</p>
        <p>Attack: {{ info.stats[1].base_stat }}</p>
        <p>Defense: {{ info.stats[2].base_stat }}</p>
        <p>Speed: {{ info.stats[5].base_stat }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import LoaderGeneric from "./LoaderGeneric.vue";

import { getPokemon, getPokemonImageUrl } from "@/services/pokemon-service";

export default {
  components: {
    LoaderGeneric,
  },
  setup() {
    const route = useRoute();
    const info = ref(null);
    const isLoad = ref(false);

    onMounted(() => {
      isLoad.value = true;
      getPokemon(route.params.id)
        .then((resp) => {
          console.log(resp.stats);
          info.value = resp;
        })
        .finally(() => {
          isLoad.value = false;
        });
    });

    const image = computed(() => getPokemonImageUrl(route.params.id));

    return { isLoad, info, image };
  },
};
</script>

<style scoped>
@import "primeflex/primeflex.min.css";

.image-tam {
  height: 150px;
}
</style>
