import { Button, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { CiLock } from "react-icons/ci";
import Link from "next/link";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src="/images/general/Logo.png"
          alt="SIMS PPOB Logo"
          width={32}
          height={32}
        />
        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
      </div>

      <h2 className="text-xl font-bold text-center leading-tight">
        Lengkap data untuk <br /> membuat akun
      </h2>
      <form
        className={cn("flex w-full flex-col gap-3")}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Input
                {...field}
                type="text"
                variant="bordered"
                autoComplete="off"
                radius="sm"
                placeholder="masukan email anda"
                isInvalid={!!errors.email}
                startContent={<span className="text-default-400">@</span>}
              />
              {errors.email && (
                <p className="text-xs text-red-500 text-right">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Input
                {...field}
                type="text"
                variant="bordered"
                autoComplete="off"
                radius="sm"
                placeholder="nama depan"
                isInvalid={!!errors.first_name}
                startContent={
                  <span className="text-default-400">
                    <IoPersonOutline />
                  </span>
                }
              />
              {errors.first_name && (
                <p className="text-xs text-red-500 text-right">
                  {errors.first_name.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Input
                {...field}
                type="text"
                variant="bordered"
                autoComplete="off"
                radius="sm"
                placeholder="nama belakang"
                isInvalid={!!errors.last_name}
                startContent={
                  <span className="text-default-400">
                    <IoPersonOutline />
                  </span>
                }
              />
              {errors.last_name && (
                <p className="text-xs text-red-500 text-right">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Input
                {...field}
                type={visiblePassword.password ? "text" : "password"}
                variant="bordered"
                autoComplete="off"
                radius="sm"
                placeholder="buat password"
                isInvalid={!!errors.password}
                startContent={
                  <span className="text-default-400">
                    <CiLock />
                  </span>
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => handleVisiblePassword("password")}
                  >
                    {visiblePassword.password ? (
                      <FaEye className="pointer-events-none text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-xs text-red-500 text-right">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Input
                {...field}
                type={visiblePassword.confirmPassword ? "text" : "password"}
                variant="bordered"
                autoComplete="off"
                radius="sm"
                placeholder="konfirmasi password"
                isInvalid={!!errors.confirmPassword}
                startContent={
                  <span className="text-default-400">
                    <CiLock />
                  </span>
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => handleVisiblePassword("confirmPassword")}
                  >
                    {visiblePassword.confirmPassword ? (
                      <FaEye className="pointer-events-none text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 text-right">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
        />

        <Button
          size="md"
          radius="sm"
          type="submit"
          className="font-semibold bg-red-500 text-white mt-3"
        >
          {isPendingRegister ? (
            <Spinner color="white" size="sm" />
          ) : (
            "Registrasi"
          )}
        </Button>
      </form>

      <p className="text-sm">
        sudah punya akun? login{" "}
        <Link href="/auth/login" className="text-red-500 font-medium">
          di sini
        </Link>
      </p>
    </div>
  );
};

export default Register;
