<template>
  <div id="app">
    <div class="container">
      <nav-bar />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {
    NavBar
  },
}
</script>

<style lang="scss">
  @import "~materialize-css/dist/css/materialize.min.css";
</style>
