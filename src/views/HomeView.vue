<template>
  <poke-navbar title="PokeShow" />
  <div class="home">
    <PokeList />
  </div>
</template>

<script lang="ts">
import PokeList from "@/components/PokeList.vue";
import PokeNavbar from "@/components/PokeNavbar.vue";

export default {
  name: "HomeView",
  components: {
    PokeList,
    PokeNavbar,
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
