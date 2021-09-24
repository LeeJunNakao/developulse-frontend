import { citiesService } from "@/http-services";
import { provicies } from "@/utils/content";
import { useStore } from "vuex";

export const getCities = async (provinceCode: string): Promise<void> => {
  const store = useStore();

  const { Items: cities } = await citiesService.getCities(provinceCode);

  store.dispatch("cities/setCities", {
    provinceCode,
    cities,
  });
};

export const getAllProvincesCities = async (): Promise<void> => {
  const provincesCodes = Object.values(provicies);
  provincesCodes.forEach(async (provinceCode) => getCities(provinceCode));
};
