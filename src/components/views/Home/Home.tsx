import HomeService from "./HomeService";
import useHome from "./useHome";

const Home = () => {
  const { dataServices, isLoadingServices } = useHome();
  return (
    <div>
      <HomeService
        services={dataServices?.data}
        isLoading={isLoadingServices}
      />
    </div>
  );
};

export default Home;
