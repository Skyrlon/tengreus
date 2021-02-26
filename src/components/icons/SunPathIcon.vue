<template>
  <svg viewBox="-10 0 120 75" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect
        id="sun-path_sun-ray"
        x="-0.5"
        y="-10"
        rx="2"
        r="2"
        width="1"
        height="5"
        fill="#f7f701"
      />
      <g id="sun-path_sun">
        <use x="0" href="#sun-path_sun-ray" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(45 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(90 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(135 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(180 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(225 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(270 0 0)" />
        <use x="0" href="#sun-path_sun-ray" transform="rotate(315 0 0)" />
        <circle cx="0" cy="0" r="4" fill="#f7f701" />
      </g>
    </defs>
    <mask id="sun_background" v-if="time > sunRise && time < sunSet">
      <rect fill="white" x="0" y="0" width="100%" height="100%" />
      <circle
        cx="10"
        cy="60"
        r="11"
        fill="black"
        :style="`transform-origin: 50px 60px; transform: rotate(${sunPos(
          time,
          sunRise,
          sunSet
        )}deg)`"
      />
    </mask>
    <path
      d="M10,60 a10,10 0 0,1 80,00"
      stroke="yellow"
      fill="transparent"
      stroke-width="2"
      mask="url(#sun_background)"
    />
    <use
      v-if="time > sunRise && time < sunSet"
      x="10"
      y="60"
      href="#sun-path_sun"
      :style="`transform-origin: 50px 60px; transform: rotate(${sunPos(
        time,
        sunRise,
        sunSet
      )}deg)`"
    />
    <text x="-5" y="75" font-size="15" :fill="textColor">
      {{ convertTime(sunRise) }}
    </text>
    <text x="60" y="75" font-size="15" :fill="textColor">
      {{ convertTime(sunSet) }}
    </text>
  </svg>
</template>

<script>
export default {
  name: "SunPathIcon",
  props: {
    time: Number,
    sunRise: Number,
    sunSet: Number,
    textColor: String,
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