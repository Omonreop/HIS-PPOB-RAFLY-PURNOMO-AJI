import bannerServices from "@/services/banner.service";
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
  const getBanners = async () => {
    const res = await bannerServices.getBanners();
    const { data } = res;
    return data;
  };

  const { data: dataBanner, isLoading: isLoadingBannner } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });
  return { dataServices, isLoadingServices, dataBanner, isLoadingBannner };
};

export default useHome;
