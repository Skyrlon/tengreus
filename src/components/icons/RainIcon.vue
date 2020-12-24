<template>
  <svg viewBox="0 0 100 100">
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
      d="M 20,50 a 10,10 0 0,1 0,-25 a 10,10 0 0,1 15,-5 a 5,5 0 0,1 40,5 a 10,10 0 0,1 0,25 Z"
      fill="lightgrey"
      stroke="black"
      stroke-width="1"
    />
    <use href="#rain" x="0" />
    <use href="#rain" x="10" />
    <use href="#rain" x="20" />
    <use href="#rain" x="30" />
    <use href="#rain" x="40" />
    <use href="#rain" x="50" />
  </svg>
</template>

<script>
export default {
  name: "RainIcon",
};
</script>

<style>
</style>