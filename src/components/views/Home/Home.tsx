import HomeBanner from "./HomeBanner";
import HomeService from "./HomeService";
import useHome from "./useHome";

const Home = () => {
  const { dataServices, isLoadingServices, dataBanner, isLoadingBannner } =
    useHome();
  return (
    <div>
      <HomeService
        services={dataServices?.data}
        isLoading={isLoadingServices}
      />
      <HomeBanner
        banners={dataBanner?.data}
        isLoadingBanners={isLoadingBannner}
      />
    </div>
  );
};

export default Home;
