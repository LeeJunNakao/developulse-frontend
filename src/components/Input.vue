<template>
  <div class="input-wrapper">
    <input
      class="input-component"
      v-model="content"
      :placeholder="placeholder"
      :maxlength="maxLength"
      data-test="input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    placeholder: [String, Number],
    maxLength: Number,
  },
  setup() {
    const content = ref<string>("");
    const clear = () => (content.value = "");

    return {
      content,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  width: 100%;
  display: flex;
  .input-component {
    outline: none;
    padding: 10px;
    border: 1px solid rgb(209, 207, 207);
    flex: 1;
    flex-grow: 1;
  }
}
</style>
