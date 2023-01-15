<template>
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect
        id="sun-ray"
        x="48"
        y="5"
        rx="2"
        r="2"
        width="4"
        height="20"
        fill="#f7f701"
      />
    </defs>
    <use x="0" href="#sun-ray" />
    <use x="0" href="#sun-ray" transform="rotate(45 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(90 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(135 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(180 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(225 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(270 50 50)" />
    <use x="0" href="#sun-ray" transform="rotate(315 50 50)" />
    <circle cx="50" cy="50" r="20" fill="#f7f701" />
  </svg>
</template>

<script>
export default {
  name: "SunIcon",
};
</script>

<style>
</style>