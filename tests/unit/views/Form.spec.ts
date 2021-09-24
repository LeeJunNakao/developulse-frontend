import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import flushPromises from "flush-promises";
import Form from "@/views/Form.vue";
import { dataTestGetter, getAttribute, setData } from "../../utils";
import store from "@/store";
import { errorMessages } from "@/utils/validator/error-messages";
import { ServiceMocker } from "../../utils/mocker";
import * as contactService from "@/http-services/contact";

describe("Form view - Unit", () => {
  it("Render Form", () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [store],
      },
    });

    const title = dataTestGetter(wrapper, "title").text();
    expect(title).toBe("Contact Us");

    const submitMessage = dataTestGetter(wrapper, "submit-message").isVisible();
    expect(submitMessage).toBe(false);

    const checkPlaceholder = (name: string, placeholder: string) => {
      const itemPlaceholder = getAttribute(
        dataTestGetter(wrapper, name),
        "input",
        "placeholder"
      );
      expect(itemPlaceholder).toBe(placeholder);
    };

    checkPlaceholder("first-name", "First Name");
    checkPlaceholder("last-name", "Last Name");
    checkPlaceholder("address", "Street Address");
    checkPlaceholder("address-complement", "Unit/Apt");
    checkPlaceholder("email", "Email");

    const button = dataTestGetter(wrapper, "submit-button").text();
    expect(button).toBe("SUBMIT");
  });

  it("Should display error message try submit with blank input", async () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [store],
      },
    });

    dataTestGetter(wrapper, "submit-button").trigger("click");
    await nextTick();

    const checkSpanError = (name: string) => {
      const span = dataTestGetter(wrapper, name).find("span");
      const spantext = span.text();
      const isVisible = span.isVisible();
      expect(spantext).toBe(errorMessages.required());
      expect(isVisible).toBe(true);
    };

    checkSpanError("first-name");
    checkSpanError("last-name");
    checkSpanError("address");
    checkSpanError("address-complement");
    checkSpanError("email");
  });

  it("Should show message error if submit fail", async () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [store],
      },
    });
    // new ServiceMocker(contactService).mockError("submitContact", new Error());

    setData(dataTestGetter(wrapper, "first-name"), "input", "Some Value");
    setData(dataTestGetter(wrapper, "last-name"), "input", "Some Value");
    setData(dataTestGetter(wrapper, "address"), "input", "Some Value");
    setData(
      dataTestGetter(wrapper, "address-complement"),
      "input",
      "Some Value"
    );
    setData(dataTestGetter(wrapper, "email"), "input", "email@email.com");
    setData(dataTestGetter(wrapper, "province"), "select", "Some province");
    setData(dataTestGetter(wrapper, "city"), "select", "Some city");

    dataTestGetter(wrapper, "submit-button").trigger("click");
    await flushPromises();
    await nextTick();

    const submitMessage = dataTestGetter(wrapper, "submit-message").text();

    expect(submitMessage).toBe("Failed to submit");
  });

  it("Should show success message if submit is successfull", async () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [store],
      },
    });
    store.dispatch("cities/setCities", {
      provinceCode: "AB",
      cities: ["city"],
    });

    const mocker = new ServiceMocker(contactService);
    mocker.mockSuccess("submitContact", { message: "ok" });

    setData(dataTestGetter(wrapper, "first-name"), "input", "Some Value");
    setData(dataTestGetter(wrapper, "last-name"), "input", "Some Value");
    setData(dataTestGetter(wrapper, "address"), "input", "Some Value");
    setData(
      dataTestGetter(wrapper, "address-complement"),
      "input",
      "Some Value"
    );
    setData(dataTestGetter(wrapper, "email"), "input", "email@email.com");
    setData(dataTestGetter(wrapper, "province"), "select", "AB");
    await nextTick();
    setData(dataTestGetter(wrapper, "city"), "select", "city");

    dataTestGetter(wrapper, "submit-button").get("button").trigger("click");
    await nextTick();
    await flushPromises();
    await nextTick();

    const submitMessage = dataTestGetter(wrapper, "submit-message").text();

    expect(submitMessage).toBe("Submited Successfully");
  });
});
