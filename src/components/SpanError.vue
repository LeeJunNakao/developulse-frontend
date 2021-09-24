<template>
  <div class="span-error-wrapper">
    <span class="span-error-component" data-test="span-error">{{ text }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpanError",
  props: {
    text: String,
  },
});
</script>

<style lang="scss">
.span-error-wrapper {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .span-error-component {
    font-size: 12px;
    color: $red;
  }
}
</style>
