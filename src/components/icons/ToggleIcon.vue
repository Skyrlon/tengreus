<template>
  <svg
    class="toggle"
    :class="{ on: onOrOff(isOn) }"
    viewBox="0 0 50 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      class="switch"
      y2="15"
      x2="35"
      y1="15"
      x1="15"
      stroke-width="30"
      stroke-linecap="var(--linecap)"
    />
    <line
      class="knob"
      y2="15"
      x2="15"
      y1="15"
      x1="15"
      stroke-width="20"
      stroke-linecap="var(--linecap)"
    />
  </svg>
</template>

<script>
export default {
  name: "ToggleIcon",
  props: {
    isOn: String,
  },
  methods: {
    onOrOff(value) {
      return value === "on" ? true : false;
    },
  },
};
</script>

<style lang="scss">
.toogle-icon {
  width: 100%;
  height: 100%;
}
.toggle {
  --on-color: dimgrey;
  --off-color: lightgrey;
  --on-knob-color: black;
  --off-knob-color: white;
  --linecap: round;
  --anim-time: 0.3s;
  > * {
    transition: all var(--anim-time) ease;
  }
  & > .knob {
    stroke: var(--off-knob-color);
  }
  & > .switch {
    stroke: var(--off-color);
  }
  &.on {
    & > .knob {
      stroke: var(--on-knob-color);
      transform: translateX(20px);
    }
    & > .switch {
      stroke: var(--on-color);
    }
  }
}
</style>