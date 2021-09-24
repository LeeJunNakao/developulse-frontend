import { Commit } from "vuex";

const actions = {
  setCities(
    { commit }: { commit: Commit },
    { provinceCode, cities }: { provinceCode: string; cities: string[] }
  ): void {
    commit("setCities", { provinceCode, cities });
  },
};

export default actions;
