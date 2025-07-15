import servServices from "@/services/service.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getServices = async () => {
    const res = await servServices.getServices();
    const { data } = res;
    return data;
  };

  const { data: dataServices, isLoading: isLoadingServices } = useQuery({
    queryKey: ["Services"],
    queryFn: getServices,
  });
  return { dataServices, isLoadingServices };
};

export default useHome;
