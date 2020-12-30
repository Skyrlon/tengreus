<template>
  <svg viewBox="0 0 100 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="SunGradient">
        <stop offset="0%" stop-color="yellow" />
        <stop offset="40%" stop-color="yellow" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
    <path
      d="M10,60 a10,10 0 0,1 80,00"
      stroke="yellow"
      fill="transparent"
      stroke-width="2"
    />
    <circle
      cx="10"
      cy="60"
      r="10"
      fill="url(#SunGradient)"
      :style="`transform-origin: 50px 60px; transform: rotate(${sunPos(
        time,
        sunRise,
        sunSet
      )}deg)`"
    />
  </svg>
</template>

<script>
export default {
  name: "SunPathIcon",
  props: {
    time: Number,
    sunRise: Number,
    sunSet: Number,
  },
  methods: {
    sunPos(hour, rise, set) {
      let pos = ((hour - rise) / (set - rise)) * 180;
      return pos;
    },
  },
};
</script>

<style>
</style>