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
.home {
  & .logo-container {
    margin: auto;
    width: 20em;
    @media (orientation: landscape) {
      margin-top: 10%;
    }
    @media (orientation: portrait) {
      margin-top: 40%;
    }
  }

  & .searchbar-container {
    margin-top: 1%;
    width: 20em;
  }
}
</style>
