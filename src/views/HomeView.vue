<template>
  <div class="home">
    <PokeList />
  </div>
</template>

<script lang="ts">
import PokeList from "@/components/PokeList.vue";

export default {
  name: "HomeView",
  components: {
    PokeList,
  },
};
</script>
