<template>
  <div class="custom-select" v-on-clickaway="hideDropdown">
    <div
      class="select-selected"
      @click="showDropdown = !showDropdown"
      :class="{ active: showDropdown }"
    >
      {{ optionSelected }}
    </div>
    <div class="select-items" v-if="showDropdown">
      <div
        :key="option"
        v-for="option in optionArray"
        @click="
          selectOption(option);
          showDropdown = !showDropdown;
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "CustomSelect",

  mixins: [clickaway],

  props: {
    optionSelected: String,
    optionArray: Array,
    selectOption: Function,
  },

  data() {
    return {
      showDropdown: false,
    };
  },

  methods: {
    hideDropdown() {
      this.showDropdown = false;
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
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  border-left: 1px solid var(--base-font-color);
  border-right: 1px solid var(--base-font-color);
  background-color: var(--base-background-color);
  & div {
    border-bottom: 1px solid var(--base-font-color);
    &:hover {
      background-color: var(--darktheme-font-color);
    }
  }
}

#app.dark .custom-select {
  & .select-selected {
    border: 1px solid var(--darktheme-font-color);
  }
  & .select-items {
    background-color: var(--darktheme-background-color);
    border-left: 1px solid var(--darktheme-font-color);
    border-right: 1px solid var(--darktheme-font-color);
    & div {
      border-bottom: 1px solid var(--darktheme-font-color);
      &:hover {
        background-color: var(--base-font-color);
      }
    }
  }
}
</style>
