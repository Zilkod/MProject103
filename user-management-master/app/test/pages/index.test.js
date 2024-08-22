import { mount } from "@vue/test-utils";
import Index from "@/pages/index.vue";
import { localVue } from "@/data/test-data/test-modules.js";

const componentData = {
  localVue,
};

const wrapper = mount(Index, componentData);

describe("index.vue", () => {
  it("render html", () => {
    expect(wrapper.find('[data-test="title"]').text()).toBe("Hello Nuxt !!");
  });
});
