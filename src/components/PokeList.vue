<template>
  <LoaderGeneric v-if="isLoad" />
  <div
    class="grid flex flex-wrap justify-content-center align-items-center transition-delay-100"
  >
    <div
      v-for="(pokemon, index) in list"
      :key="index"
      @click="selectPokemon(getPokemonId(pokemon.url))"
      class="col-3 cursor-pointer card-radius w-12rem h-9rem m-2"
    >
      <img :src="getPokemonImage(getPokemonId(pokemon.url))" />
      <p>{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getPokemonList,
  getPokemonImageUrl,
  getIdFromUrlPokemon,
} from "@/services/pokemon-service";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import LoaderGeneric from "@/components/LoaderGeneric.vue";

export default {
  components: {
    LoaderGeneric,
  },
  setup() {
    const list = ref([]);
    const router = useRouter();
    const isLoad = ref(false);

    const getPokemonId = (url: any) => getIdFromUrlPokemon(url);

    const getPokemonImage = (id: any) => getPokemonImageUrl(id);

    //There is just one 'id' 'cause the prop has same name of param id = pokemon/:id
    const selectPokemon = (id: any) =>
      router.push({ name: "pokemon", params: { id } });

    //Consume service on initial component
    onMounted(() => {
      isLoad.value = true;
      getPokemonList()
        .then((resp) => {
          list.value = resp.results;
        })
        .finally(() => {
          isLoad.value = false;
        });
    });
    return { list, getPokemonImage, getPokemonId, selectPokemon, isLoad };
  },
};
</script>

<style scoped>
@import "primeflex/primeflex.min.css";

.card-radius {
  border: 1px solid;
  border-radius: 5px;
}

.card-radius:hover {
  background: radial-gradient(
    328px at 2.9% 15%,
    rgba(191, 224, 251, 1) 0%,
    rgba(232, 233, 251, 1) 25.8%,
    rgba(252, 239, 250, 1) 50.8%,
    rgba(234, 251, 251, 1) 77.6%,
    rgba(240, 251, 244, 1) 100.7%
  );
}
</style>
