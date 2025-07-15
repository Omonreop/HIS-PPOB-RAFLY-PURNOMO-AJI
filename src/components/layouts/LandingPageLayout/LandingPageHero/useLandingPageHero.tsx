import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useLandingPageHero = () => {
  const router = useRouter();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };
  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });
  const getBalance = async () => {
    const { data } = await authServices.getBalance();
    return data.data;
  };
  const { data: dataBalance } = useQuery({
    queryKey: ["Balance"],
    queryFn: getBalance,
    enabled: router.isReady,
  });
  return { dataProfile, dataBalance };
};

export default useLandingPageHero;
