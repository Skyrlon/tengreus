<template>
  <svg viewBox="0 0 100 100">
    <defs>
      <radialGradient id="SunGradient">
        <stop offset="0%" stop-color="yellow" />
        <stop offset="40%" stop-color="yellow" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="40" r="35" fill="url(#SunGradient)" />
    <path
      d="M 20,70
            a 10,10 0 0,1 0,-25
            a 10,10 0 0,1 15,-5
            a 5,5 0 0,1 40,5
            a 10,10 0 0,1 0,25
            Z"
      fill="white"
      stroke="black"
      stroke-width="1"
    />
  </svg>
</template>

<script>
export default {
  name: "CloudWithSunIcon",
};
</script>

<style>
</style>