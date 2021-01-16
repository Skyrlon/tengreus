<template>
  <svg viewBox="0 0 100 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect
        id="sun-ray"
        x="-0.5"
        y="-10"
        rx="2"
        r="2"
        width="1"
        height="5"
        fill="#f7f701"
      />
      <g id="sun">
        <use x="0" href="#sun-ray" />
        <use x="0" href="#sun-ray" transform="rotate(45 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(90 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(135 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(180 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(225 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(270 0 0)" />
        <use x="0" href="#sun-ray" transform="rotate(315 0 0)" />
        <circle cx="0" cy="0" r="4" fill="#f7f701" />
      </g>
    </defs>
    <path
      d="M10,60 a10,10 0 0,1 80,00"
      stroke="yellow"
      fill="transparent"
      stroke-width="2"
    />
    <use
      x="10"
      y="60"
      href="#sun"
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