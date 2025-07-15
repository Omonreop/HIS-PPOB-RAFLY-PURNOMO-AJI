import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IProfile } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import authServices from "@/services/auth.service";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

const schemaUpdateInfo = yup.object({
  first_name: yup.string().required("Nama depan wajib diisi"),
  last_name: yup.string().required("Nama belakang wajib diisi"),
});

const useAkun = () => {
  const { isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchProfile();
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValuesUpdateInfo,
  } = useForm({ resolver: yupResolver(schemaUpdateInfo) });

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await authServices.uploadAvatar(formData);
    return data.data;
  };

  const { mutate: mutateUploadAvatar, isPending: isPendingUploadingAvatar } =
    useMutation({
      mutationFn: uploadAvatar,
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message || "Gagal upload avatar",
        });
      },
      onSuccess: () => {
        refetchProfile();
        setToaster({
          type: "success",
          message: "Avatar berhasil diperbarui",
        });
      },
    });

  const handleUploadAvatar = (file: File) => {
    mutateUploadAvatar(file);
  };

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValuesUpdateInfo,
    refetchProfile,

    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,

    handleUploadAvatar,
    isPendingUploadingAvatar,
  };
};
export default useAkun;
