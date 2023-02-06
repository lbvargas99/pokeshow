<template>
  <h1>PokeList</h1>
  <div
    class="grid flex flex-wrap justify-content-center align-items-center transition-delay-100"
  >
    <div
      v-for="(pokemon, index) in list"
      :key="index"
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
export default {
  setup() {
    const list = ref([]);

    const getPokemonId = (url: any) => getIdFromUrlPokemon(url);

    const getPokemonImage = (id: any) => getPokemonImageUrl(id);

    //Consume service on initial component
    onMounted(() => {
      getPokemonList().then((resp) => {
        console.log(resp);
        list.value = resp.results;
      });
    });
    return { list, getPokemonImage, getPokemonId };
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
  background: lightgray;
}
</style>
