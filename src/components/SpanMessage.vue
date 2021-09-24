<template>
  <div class="span-message-wrapper">
    <span class="span-message-component">{{ text }}</span>
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
.span-message-wrapper {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  .span-message-component {
    font-size: 25px;
    color: #126e82;
  }
}
</style>
