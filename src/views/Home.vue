<template>
  <div class="home">
    <div class="logo-container">
      <tengreus-logo />
    </div>
    <div class="searchbar-container">
      <search-bar />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import TengreusLogo from "../components/icons/TengreusLogo.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
    TengreusLogo,
  },
};
</script>

<style lang="scss">
.logo-container {
  margin: auto;
  margin-top: 10%;
  width: 20vw;
}

.searchbar-container {
  margin: auto;
  margin-top: 1%;
  width: 20em;
}
</style>
