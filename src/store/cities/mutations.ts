import { State } from "./protocols";

const mutations = {
  setCities(
    state: State,
    { provinceCode, cities }: { provinceCode: string; cities: string[] }
  ): void {
    state.cities[provinceCode] = cities;
  },
};

export default mutations;
