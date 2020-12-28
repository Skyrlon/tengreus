<template>
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <def>
      <path
        id="rain"
        d="M30, 51 v 49"
        stroke="lightblue"
        stroke-width="3"
        stroke-dasharray="5"
        transform="skewX(-10)"
      />
    </def>
    <path
      d="M 20,50 
        a 10,10 0 0,1 0,-25
        a 10,10 0 0,1 15,-5
        a 5,5 0 0,1 40,5
        a 10,10 0 0,1 0,25
        Z"
      fill="grey"
      stroke="black"
      stroke-width="1"
    />
    <use href="#rain" x="0" v-if="isRaining == true" />
    <use href="#rain" x="10" v-if="isRaining == true" />
    <use href="#rain" x="20" v-if="isRaining == true" />
    <use href="#rain" x="30" v-if="isRaining == true" />
    <use href="#rain" x="40" v-if="isRaining == true" />
    <use href="#rain" x="50" v-if="isRaining == true" />
    <path
      d="M 40,51
        l -10,20 10,0 -10,25 25,-27.5 -10,0 10,-17.5
        Z"
      fill="yellow"
    />
  </svg>
</template>

<script>
export default {
  name: "ThunderIcon",
  props: {
    isRaining: Boolean,
  },
};
</script>

<style>
</style>