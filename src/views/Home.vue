<template>
  <div class="home">
    <div class="logo-container">
      <tengreus-logo />
    </div>
    <search-bar />
  </div>
</template>

<script>
// @ is an alias to /src
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
  width: 15%;
}
</style>
