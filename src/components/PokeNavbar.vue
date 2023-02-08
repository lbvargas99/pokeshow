<template>
  <nav class="nav">
    <h1>{{ title }}</h1>
    <router-link class="decoration-link" to="/">Home</router-link>
  </nav>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
h1 {
  font-weight: 600;
  padding-left: 40px;
  cursor: default;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  background: #fff;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  z-index: 100;
}

.decoration-link {
  text-decoration: none;
  color: black;
}
</style>
