<template>
  <div class="form-wrapper">
    <div class="form">
      <Title text="Contact Us" />
      <div class="form-inputs">
        <Input
          placeholder="First Name"
          class="form-input"
          ref="firstNameInput"
        />
        <Input placeholder="Last Name" class="form-input" ref="lastNameInput" />
        <Input
          placeholder="Street Address"
          class="form-input"
          ref="addressInput"
        />
        <Input
          placeholder="Unit/Apt"
          class="form-input"
          ref="addressComplInput"
        />
        <Select
          :options="provincieOptions"
          placeholder="Province/Territory/State"
          class="form-input"
          ref="provinceInput"
        />
        <Select
          :options="cityOptions"
          placeholder="City"
          class="form-input"
          ref="cityInput"
        />
        <Input placeholder="Email" class="form-input" ref="emailInput" />
      </div>
      <div class="form-buttons">
        <Button label="SUBMIT" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import Title from "@/components/Title.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import { provicies } from "@/utils/content";
// import { validator, required, maxLength, validEmail} from "@/utils/validator";
import Button from "@/components/Button.vue";
import { getCities } from "@/services/citites";

interface SubmitionData {
  Name: string;
  Address: string;
  Address2: string;
  City: string;
  Province: string;
  Email: string;
}

interface FormValidation {
  name: boolean;
  address: boolean;
  addressCompl: boolean;
  province: boolean;
  city: boolean;
  email: boolean;
}

export default defineComponent({
  name: "Form",
  setup() {
    const store = useStore();

    const firstNameInput = ref<InstanceType<typeof Input> | null>(null);
    const lastNameInput = ref<InstanceType<typeof Input> | null>(null);
    const addressInput = ref<InstanceType<typeof Input> | null>(null);
    const addressComplInput = ref<InstanceType<typeof Input> | null>(null);
    const provinceInput = ref<InstanceType<typeof Select> | null>(null);
    const cityInput = ref<InstanceType<typeof Select> | null>(null);
    const emailInput = ref<InstanceType<typeof Input> | null>(null);

    const selectedProvince = computed(() => provinceInput.value?.selected);

    const provincieOptions = Object.entries(provicies).map(
      ([label, value]) => ({ label, value })
    );

    const cityOptions = computed(() => {
      const cities =
        store.getters["cities/getCitiesByProvince"](selectedProvince.value) ||
        [];
      return cities.map((city: string) => ({ label: city, value: city }));
    });

    const formData = computed(
      (): SubmitionData => ({
        Name: `${firstNameInput.value?.content} ${lastNameInput.value?.content}`,
        Address: addressInput.value?.content || "",
        Address2: addressComplInput.value?.content || "",
        City: cityInput.value?.selected || "",
        Province: provinceInput.value?.selected || "",
        Email: emailInput.value?.content || "",
      })
    );

    const formValidation = computed(
      (): FormValidation => ({
        name: false,
        address: false,
        addressCompl: false,
        province: false,
        city: false,
        email: false,
      })
    );

    watch(
      selectedProvince,
      (province) => {
        if (province && !cityOptions.value.length) getCities(province);
      },
      { immediate: true }
    );

    return {
      firstNameInput,
      lastNameInput,
      addressInput,
      addressComplInput,
      provinceInput,
      cityInput,
      emailInput,
      provincieOptions,
      cityOptions,
    };
  },
  components: {
    Input,
    Title,
    Select,
    Button,
  },
});
</script>

<style lang="scss" scoped>
$background-color: #b5deff;

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $background-color;
  width: 100vw;
  height: 100vh;

  .form {
    background-color: #fbf4e9;
    padding: 20px;

    .form-inputs {
      padding-top: 20px;
      width: 800px;
      flex-wrap: wrap;

      .form-input + .form-input {
        margin-top: 10px;
      }
    }
    .form-buttons {
      width: 100%;
      padding-top: 20px;
    }
  }
}
</style>
