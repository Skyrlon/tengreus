<template>
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <def>
      <rect
        id="sun-ray"
        x="-1"
        y="-22"
        rx="2"
        r="2"
        width="2"
        height="10"
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
        <circle cx="0" cy="0" r="10" fill="#f7f701" />
      </g>
      <path
        id="cloud"
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
    </def>
    <moon-icon
      :moonPhase="moonPhase"
      style="transform: scale(0.5)"
      v-if="cloudiness == 'few clouds' && moonOrSun == 'night'"
    />
    <use
      x="30"
      y="35"
      href="#sun"
      v-if="cloudiness == 'few clouds' && moonOrSun == 'day'"
    />
    <use
      x="-5"
      y="5"
      href="#cloud"
      transform="scale(0.6)"
      v-if="cloudiness == 'overcast clouds'"
    />
    <use x="0" y="0" href="#cloud" />
    <use
      x="40"
      y="45"
      href="#cloud"
      transform="scale(0.7)"
      v-if="cloudiness == 'broken clouds' || cloudiness == 'overcast clouds'"
    />
  </svg>
</template>

<script>
import MoonIcon from "./MoonIcon.vue";
export default {
  name: "CloudIcon",
  components: {
    MoonIcon,
  },
  props: {
    cloudiness: String,
    moonPhase: String,
    moonOrSun: String,
  },
};
</script>