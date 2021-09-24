<template>
  <div class="title">
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    text: String,
  },
});
</script>

<style lang="scss" scoped>
.title {
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
