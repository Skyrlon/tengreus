<template>
  <div id="app" @beforeunload="window.sessionStorage.clear()">
    <home v-if="this.$store.state.currentView === 'Home'" />
    <weather v-if="this.$store.state.currentView === 'Weather'" />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Weather from "./views/Weather.vue";

export default {
  components: {
    Home,
    Weather,
  },
};
</script>

<style lang="scss">
body {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
