import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const bannerServices = {
  getBanners: () => instance.get(endpoint.BANNER),
};
export default bannerServices;
