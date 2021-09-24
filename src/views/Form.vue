<template>
  <div class="form-wrapper">
    <div class="form">
      <Title text="Contact Us" />
      <div
        v-show="
          formStatus === Phase.SUBMITED_SUCCESS ||
          formStatus === Phase.SUBMITED_FAIL
        "
        class="message"
        :class="{
          fail: formStatus === Phase.SUBMITED_FAIL,
        }"
      >
        <SpanMessage :text="submitionMessage" />
      </div>
      <div
        class="form-inputs"
        :class="{ validating: formStatus === Phase.VALIDATE }"
      >
        <div class="form-input">
          <Input
            placeholder="First Name"
            ref="firstNameInput"
            :maxLength="40"
          />
          <SpanError :text="formValidation.firstName" />
        </div>

        <div class="form-input">
          <Input placeholder="Last Name" ref="lastNameInput" :maxLength="40" />
          <SpanError :text="formValidation.lastName" />
        </div>

        <div class="form-input">
          <Input
            placeholder="Street Address"
            ref="addressInput"
            :maxLength="128"
          />
          <SpanError :text="formValidation.address" />
        </div>

        <div class="form-input">
          <Input
            placeholder="Unit/Apt"
            ref="addressComplInput"
            :maxLength="128"
          />
          <SpanError :text="formValidation.addressCompl" />
        </div>

        <div class="form-input">
          <Select
            :options="provincieOptions"
            placeholder="Province/Territory/State"
            ref="provinceInput"
          />
          <SpanError :text="formValidation.province" />
        </div>

        <div class="form-input">
          <Select :options="cityOptions" placeholder="City" ref="cityInput" />
          <SpanError :text="formValidation.city" />
        </div>

        <div class="form-input">
          <Input
            placeholder="Email"
            class="form-input"
            ref="emailInput"
            :maxLength="128"
          />
          <SpanError :text="formValidation.email" />
        </div>
      </div>
      <div class="form-buttons">
        <Button label="SUBMIT" :onClick="submit" />
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
import { validate, required, validEmail } from "@/utils/validator";
import Button from "@/components/Button.vue";
import { getCities } from "@/services/citites";
import SpanError from "@/components/SpanError.vue";
import SpanMessage from "@/components/SpanMessage.vue";
import { contactService } from "@/http-services";

interface SubmitionData {
  Name: string;
  Address: string;
  Address2: string;
  City: string;
  Province: string;
  Email: string;
}

interface FormValidation {
  firstName: string;
  lastName: string;
  address: string;
  addressCompl: string;
  province: string;
  city: string;
  email: string;
}

enum Phase {
  INITIAL = 1,
  VALIDATE = 2,
  SUBMITED_SUCCESS = 3,
  SUBMITED_FAIL = 4,
}

export default defineComponent({
  name: "Form",
  setup() {
    const store = useStore();

    const formStatus = ref<Phase>(Phase.INITIAL);
    watch(formStatus, (status) => console.log("status!", status));

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

    const formValidation = computed((): FormValidation => {
      const firstName = firstNameInput.value?.content || "";
      const lastName = lastNameInput.value?.content || "";
      const { Address, Address2, City, Province, Email } = formData.value;

      return {
        firstName: validate(firstName, required),
        lastName: validate(lastName, required),
        address: validate(Address, required),
        addressCompl: validate(Address2, required),
        province: validate(Province, required),
        city: validate(City, required),
        email: validate(Email, required, validEmail),
      };
    });

    const submitionMessage = computed(() =>
      formStatus.value === 3 ? "Submited Successfully" : "Failed to submit"
    );

    const submit = async () => {
      formStatus.value = Phase.VALIDATE;
      const isFormValid = Object.values(formValidation.value).every((i) => !i);
      if (isFormValid) {
        try {
          await contactService.submitContact(formData.value);
          formStatus.value = Phase.SUBMITED_SUCCESS;
        } catch (error) {
          formStatus.value = Phase.SUBMITED_FAIL;
        }
      }
    };

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
      formValidation,
      submit,
      submitionMessage,
      formStatus,
      Phase,
    };
  },
  components: {
    Input,
    Title,
    Select,
    Button,
    SpanError,
    SpanMessage,
  },
});
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $background-color;
  width: 100vw;
  height: 100vh;

  .form {
    background-color: $background-form-color;
    padding: 20px;

    .message:deep {
      &.fail {
        .span-message-wrapper {
          .span-message-component {
            color: $red;
          }
        }
      }
    }

    .form-inputs {
      padding-top: 20px;
      width: 800px;
      flex-wrap: wrap;

      .form-input + .form-input {
        margin-top: 10px;
      }

      .form-input:deep .span-error-component {
        margin-left: 5px;
        opacity: 0;
      }

      &.validating:deep .span-error-component {
        opacity: 1;
      }
    }
    .form-buttons {
      width: 100%;
      padding-top: 20px;
    }
  }
}
</style>
