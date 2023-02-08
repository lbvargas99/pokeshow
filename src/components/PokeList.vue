<template>
  <LoaderGeneric v-if="isLoad" />
  <input
    id="search"
    type="text"
    placeholder="Search pokemon"
    v-model="searchValue"
    autocomplete="off"
  />
  <div v-if="pokeList.length" class="transition-delay-100 container">
    <div
      v-for="(pokemon, index) in pokeList"
      :key="index"
      @click="selectPokemon(getPokemonId(pokemon.url))"
      class="col-3 cursor-pointer card h-10rem m-2"
    >
      <img :src="getPokemonImage(getPokemonId(pokemon.url))" />
      <p>{{ pokemon.name }}</p>
    </div>
  </div>
  <div v-else class="container">
    No pokemons found for this search: {{ searchValue }}
  </div>
</template>

<script lang="ts">
import {
  getPokemonList,
  getPokemonImageUrl,
  getIdFromUrlPokemon,
} from "@/services/pokemon-service";
import { ref, onMounted, computed } from "vue";
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
    const searchValue = ref("");

    const getPokemonId = (url: any) => getIdFromUrlPokemon(url);

    const getPokemonImage = (id: any) => getPokemonImageUrl(id);

    //There is just one 'id' 'cause the prop has same name of param id = pokemon/:id
    const selectPokemon = (id: any) =>
      router.push({ name: "pokemon", params: { id } });

    //Performs the search with searchValue from input and filter on array
    const pokeList = computed(() => {
      if (searchValue.value.trim().length >= 3) {
        return list.value.filter((poke: any) =>
          poke.name
            .toLowerCase()
            .includes(searchValue.value.trim().toLocaleLowerCase())
        );
      }
      return list.value;
    });

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
    return {
      list,
      getPokemonImage,
      getPokemonId,
      selectPokemon,
      isLoad,
      searchValue,
      pokeList,
    };
  },
};
</script>

<style scoped>
@import "primeflex/primeflex.min.css";

#search {
  width: 450px;
  margin: 10px;
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 20px;
  border: none;
}

#search:focus {
  outline: none;
}

.container {
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 9rem !important;
}

.card:hover {
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
