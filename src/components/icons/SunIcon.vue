<template>
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
      <radialGradient id="SunGradient">
        <stop offset="0%" stop-color="yellow"/>
        <stop offset="40%" stop-color="yellow"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
  </defs>

  <circle cx="50" cy="50" r="49" fill="url(#SunGradient)"/>
  </svg>
</template>

<script>
export default {
  name: "SunIcon",
};
</script>

<style>
</style>