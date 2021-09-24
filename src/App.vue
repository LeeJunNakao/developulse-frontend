<template>
  <Form />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Form from "@/views/Form.vue";
import { getAllProvincesCities } from "@/services/citites";

export default defineComponent({
  name: "App",
  components: {
    Form,
  },
  setup() {
    onMounted(() => {
      getAllProvincesCities();
    });
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}
</style>
