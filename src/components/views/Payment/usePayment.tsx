import servServices from "@/services/service.service";
import { IService } from "@/types/Services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const { query } = useRouter();
  const serviceCode = query.code as string;
  console.log("DEBUG: serviceCode dari URL");

  const getServices = async () => {
    const res = await servServices.getServices();
    console.log("DEBUG services response:", res);
    return res.data.data;
  };

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Services"],
    queryFn: getServices,
    enabled: !!serviceCode,
  });

  const service = Array.isArray(services)
    ? services.find((s: IService) => s.service_code === serviceCode)
    : undefined;

  return { service, isLoading, isError };
};

export default usePayment;
