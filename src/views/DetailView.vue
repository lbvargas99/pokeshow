<template>
  <poke-navbar title="PokeShow" />
  <div class="detail">
    <PokeDetail />
  </div>
</template>

<script lang="ts">
import PokeDetail from "@/components/PokeDetail.vue";
import PokeNavbar from "@/components/PokeNavbar.vue";

export default {
  name: "DetailView",
  components: {
    PokeDetail,
    PokeNavbar,
  },
};
</script>

<style>
.detail {
  display: flex;
  justify-content: center;
}
</style>
