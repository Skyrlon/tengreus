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

<style>
.custom-select {
  position: relative;
  width: 10em;
}

.select-selected {
  background-color: DodgerBlue;
}

.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.select-selected.active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

.select-items div,
.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}

.select-items {
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

.select-items div:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
