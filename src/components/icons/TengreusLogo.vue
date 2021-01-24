<template>
  <svg
    viewBox="0 0 200 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <def>
      <rect
        id="sun-ray"
        x="29"
        y="9"
        rx="2"
        r="2"
        width="2"
        height="10"
        fill="#f7f701"
      />
    </def>

    <path d="M120,1 A40,79.5 90,0 0 80,99" fill="lightblue" />
    <path d="M120,1 A40,79.5 90,0 1 80,99" fill="lightgrey" />
    <use x="0" href="#sun-ray" />
    <use x="0" href="#sun-ray" transform="rotate(45 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(90 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(135 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(180 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(225 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(270 30 30)" />
    <use x="0" href="#sun-ray" transform="rotate(315 30 30)" />
    <circle cx="30" cy="30" r="10" fill="#f7f701" />
    <text x="10" y="60" font-size="35" font-weight="bold" font-family="Verdana">
      Tengreus
    </text>
    <path
      d="M 300,140 
             a 10,10 0 0,1 0,-25
             a 10,10 0 0,1 15,-5
             a 5,5 0 0,1 40,5
             a 10,10 0 0,1 0,25
             Z"
      fill="grey"
      stroke="black"
      stroke-width="1"
      transform="scale(0.5)"
    />
    <path
      d="M 320,141
             l -10,20 10,0 -10,25 25,-27.5 -10,0 10,-17.5
             Z"
      fill="#f7f701"
      transform="scale(0.5)"
    />
  </svg>
</template>

<script>
export default {
  name: "TengreusLogo",
};
</script>