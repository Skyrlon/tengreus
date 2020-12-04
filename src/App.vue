<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/weather_card">Weather Card</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  bottom:0;
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
