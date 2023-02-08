<template>
  <LoaderGeneric v-if="isLoad" />
  <div class="container">
    <div v-if="info" class="">
      <div class="sub-container">
        <div class="pokemon-card">
          <img class="image-tam" :src="image" />
          <h2>{{ info.name }}</h2>
        </div>
        <div class="atributos-card">
          <h2>Attributes</h2>
          <p>HP: {{ info.stats[0].base_stat }}</p>
          <p>Attack: {{ info.stats[1].base_stat }}</p>
          <p>Defense: {{ info.stats[2].base_stat }}</p>
          <p>Speed: {{ info.stats[5].base_stat }}</p>
        </div>
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

.container {
  display: flex;
  justify-content: center;
  width: 700px;
}

.sub-container {
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-tam {
  height: 150px;
}

.pokemon-card,
.atributos-card {
  width: 300px !important;
  border-radius: 5px;
  background: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin: 20px;
}
</style>
