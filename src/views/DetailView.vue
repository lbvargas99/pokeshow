<template>
  <div class="detail">
    <PokeDetail />
  </div>
</template>

<script lang="ts">
import PokeDetail from "@/components/PokeDetail.vue";

export default {
  name: "DetailView",
  components: {
    PokeDetail,
  },
};
</script>
