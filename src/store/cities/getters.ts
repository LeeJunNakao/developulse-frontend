import { State } from "./protocols";

const getters = {
  getCitiesByProvince:
    (state: State) =>
    (provinceCode: string): State["cities"][string] =>
      state.cities[provinceCode],
};

export default getters;
