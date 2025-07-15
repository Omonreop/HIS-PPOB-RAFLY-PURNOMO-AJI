import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const servServices = {
  getServices: () => instance.get(endpoint.SERVICES),
};

export default servServices;
