import { Button, Input, Skeleton, Spinner } from "@heroui/react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useAkun from "./useAkun";
import InputAvatar from "@/components/ui/InputFile";
import { signOut } from "next-auth/react";

const Akun = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValuesUpdateInfo,

    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,

    handleUploadAvatar,
    isPendingUploadingAvatar,
  } = useAkun();

  useEffect(() => {
    if (dataProfile) {
      setValuesUpdateInfo("first_name", `${dataProfile?.first_name}`);
      setValuesUpdateInfo("last_name", `${dataProfile?.last_name}`);
    }
  }, [dataProfile]);
  useEffect(() => {
    if (isSuccessMutateUpdateProfile) {
      resetUpdateInfo();
      setIsEditing(false);
    }
  }, [isSuccessMutateUpdateProfile]);

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-6">
        <InputAvatar
          preview={dataProfile?.profile_image}
          isUploading={isPendingUploadingAvatar}
          onUpload={(files) => handleUploadAvatar(files[0])}
        />
        <h2 className="text-xl font-semibold mt-3">
          {dataProfile?.first_name} {dataProfile?.last_name}
        </h2>
      </div>

      <form
        onSubmit={handleSubmitUpdateInfo(handleUpdateProfile)}
        className="space-y-4 mb-3"
      >
        <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
          <Input
            type="email"
            variant="bordered"
            radius="sm"
            placeholder="Email"
            isDisabled
            value={dataProfile?.email}
            startContent={<FaEnvelope className="text-default-400" />}
          />
        </Skeleton>

        <Skeleton isLoaded={!!dataProfile?.first_name} className="rounded-lg">
          <Controller
            name="first_name"
            control={controlUpdateInfo}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                variant="bordered"
                radius="sm"
                placeholder="Nama Depan"
                isInvalid={!!errorsUpdateInfo.first_name}
                errorMessage={errorsUpdateInfo.first_name?.message}
                isDisabled={!isEditing}
                startContent={<FaUser className="text-default-400" />}
              />
            )}
          />
        </Skeleton>

        <Skeleton isLoaded={!!dataProfile?.last_name} className="rounded-lg">
          <Controller
            name="last_name"
            control={controlUpdateInfo}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                variant="bordered"
                radius="sm"
                placeholder="Nama Belakang"
                isInvalid={!!errorsUpdateInfo.last_name}
                errorMessage={errorsUpdateInfo.last_name?.message}
                isDisabled={!isEditing}
                startContent={<FaUser className="text-default-400" />}
              />
            )}
          />
        </Skeleton>

        <Button
          type={isEditing ? "submit" : "button"}
          className="w-full bg-red-500 text-white"
          onClick={(e) => {
            if (!isEditing) {
              e.preventDefault();
              setIsEditing(true); // Aktifkan edit mode
            }
          }}
        >
          {isPendingMutateUpdateProfile ? (
            <Spinner color="white" size="sm" />
          ) : isEditing ? (
            "Simpan"
          ) : (
            "Edit Profil"
          )}
        </Button>
      </form>
      <Button
        onPress={() =>
          signOut({
            callbackUrl: "/auth/login",
          })
        }
        variant="bordered"
        className="w-full border-red-500 text-red-500"
      >
        Logout
      </Button>
    </div>
  );
};

export default Akun;
