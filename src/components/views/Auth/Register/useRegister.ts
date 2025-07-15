import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

interface CustomError extends Error {
  response: {
    data: {
      message: string[];
    };
  };
}
const registerSchema = yup.object().shape({
  first_name: yup.string().required("Please input your full name"),
  last_name: yup.string().required("Please input your last name"),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password does not match")
    .required("Please input your password confirmation"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error: CustomError) => {
      const message = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message.join(", ")
        : error?.response?.data?.message ||
          error?.message ||
          "Terjadi kesalahan saat registrasi";
      setToaster({ type: "error", message: message });
    },
    onSuccess: () => {
      reset();
      setToaster({ type: "success", message: "berhasil mendaftar" });

      router.push("/auth/login");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    errors,
    isPendingRegister,
    handleRegister,
  };
};

export default useRegister;
