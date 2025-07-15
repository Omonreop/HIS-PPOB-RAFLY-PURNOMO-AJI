import { Button, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { CiLock } from "react-icons/ci";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src="/images/general/Logo.png"
          alt="SIMS PPOB Logo"
          width={32}
          height={32}
        />
        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
      </div>

      <h2 className="text-2xl font-bold text-center leading-tight">
        Masuk atau buat akun <br /> untuk memulai
      </h2>

      <form
        className={cn(
          "flex w-80 flex-col",
          Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
        )}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              variant="bordered"
              autoComplete="off"
              radius="sm"
              placeholder="masukan email anda"
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
              startContent={<span className="text-default-400">@</span>}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              autoComplete="off"
              radius="sm"
              placeholder="masukan password anda"
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              startContent={
                <span className="text-default-400">
                  <CiLock />
                </span>
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
          )}
        />

        <Button
          size="lg"
          type="submit"
          className="font-semibold bg-red-500 text-white"
        >
          {isPendingLogin ? <Spinner color="white" size="sm" /> : "Masuk"}
        </Button>
      </form>

      <p className="text-sm">
        belum punya akun? registrasi{" "}
        <Link href="/auth/register" className="text-red-500 font-medium">
          di sini
        </Link>
      </p>
    </div>
  );
};

export default Login;
