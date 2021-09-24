<template>
  <div class="select-wrapper" :class="{ disabled: isDisabled }">
    <select
      v-model="selected"
      class="select-component"
      :class="{ blank: !selected }"
      :disabled="isDisabled"
      data-test="select"
    >
      <option value="" disabled selected hidden>
        {{ placeholder }}
      </option>
      <option
        v-for="({ label, value }, index) in options"
        :value="value"
        :key="`${label}_${index}`"
        class="select-option"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";

interface Option {
  label: string;
  value: any;
}

export default defineComponent({
  name: "Select",
  props: {
    options: Array as PropType<Option[]>,
    placeholder: String,
  },
  setup(props) {
    const { options } = toRefs(props);
    const selected = ref("");
    const isDisabled = computed(
      () => options.value?.length === 0 || Boolean(!options.value)
    );
    const clear = () => (selected.value = "");

    return {
      selected,
      isDisabled,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
select::-ms-expand {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
}

select {
  -moz-appearance: none;
  appearance: none;
}

.select-wrapper {
  display: flex;
  width: 100%;
  position: relative;

  &:hover {
    cursor: pointer;
    select {
      cursor: pointer;
    }
  }

  &.disabled {
    select {
      background-color: #9d9d9d50;
    }
  }

  &:after {
    content: "";
    border: solid black;
    border-width: 0 2px 2px 0;
    height: 2px;
    width: 2px;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);

    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  .select-component {
    outline: none;
    padding: 10px;
    padding-left: 5px;
    border: 1px solid rgb(209, 207, 207);
    flex: 1;
    flex-grow: 1;
    background-color: white;

    &.blank {
      color: gray;

      option {
        color: black;
      }
    }
  }
}
</style>
