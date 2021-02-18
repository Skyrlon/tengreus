<template>
  <div class="custom-select">
    <div
      class="select-selected"
      @click="showDropdown = !showDropdown"
      :class="{ active: showDropdown }"
    >
      {{ optionSelected }}
    </div>
    <div class="select-items" v-if="showDropdown">
      <div
        :key="option.value"
        v-for="option in optionArray"
        @click="
          selectOption(option.value, option.text);
          showDropdown = !showDropdown;
        "
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    optionSelected: String,
    optionValue: Array,
    optionText: Array,
    selectOption: Function,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    optionArray() {
      let array = [];
      for (let i = 0; i < this.optionValue.length; i++) {
        array.push({ value: this.optionValue[i], text: this.optionText[i] });
      }
      return array;
    },
  },
};
</script>

<style lang="scss">
.custom-select {
  position: relative;
  width: 100%;
}

.select-selected {
  border: 1px solid var(--base-font-color);
  &:after {
    position: absolute;
    content: "";
    top: 50%;
    right: 5%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: var(--base-font-color);
  }
  &.active:after {
    border-bottom-color: var(--base-font-color);
    border-top-color: transparent;
    top: 25%;
  }
}

.select-items div,
.select-selected {
  padding-top: 5%;
  padding-bottom: 5%;
  text-transform: none;
  cursor: pointer;
  user-select: none;
}

.select-items {
  position: absolute;
  background-color: var(--base-background-color);
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  border-left: 1px solid var(--base-font-color);
  border-right: 1px solid var(--base-font-color);
  & div {
    border-bottom: 1px solid var(--base-font-color);
    &:hover {
      background-color: var(--darktheme-font-color);
    }
  }
}
</style>
