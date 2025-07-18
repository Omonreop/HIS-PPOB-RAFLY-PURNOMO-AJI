import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin, IRegister, IUpdateProfile } from "@/types/Auth";

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.REGISTER}`, payload),

  login: (payload: ILogin) => instance.post(endpoint.LOGIN, payload),

  getProfileWithToken: (token: string) =>
    instance.get(endpoint.PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getProfile: () => instance.get(`${endpoint.PROFILE}`),
  updateProfile: (payload: IUpdateProfile) =>
    instance.put(`${endpoint.UPDATE_PROFILE}`, payload),
  getBalance: () => instance.get(`${endpoint.BALANCE}`),
  uploadAvatar: (payload: FormData) =>
    instance.put(endpoint.PROFILE_IMAGE, payload, formDataHeader),
};

export default authServices;
