<template>
  <div class="button-wrapper">
    <button class="button-component" @click="onClick" data-test="button">
      {{ label }}
    </button>
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
    background-color: $button-color;
    color: $button-text-color;
    border: 1px solid $button-border-color;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
    }

    &:active {
      background-color: $button-active-bg-color;
      color: $button-active-text-color;
      border: 1px solid $button-active-border-color;
    }
  }
}
</style>
