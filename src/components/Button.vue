<template>
  <div class="button-wrapper">
    <button class="button-component" @click="onClick">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    label: String,
    onClick: Function,
  },
});
</script>

<style lang="scss">
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .button-component {
    min-width: 50px;
    padding: 10px;
    background-color: white;
    border: 1px solid black;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
    }

    &:active {
      background-color: #22577a;
      border: 1px solid white;
      color: white;
    }
  }
}
</style>
