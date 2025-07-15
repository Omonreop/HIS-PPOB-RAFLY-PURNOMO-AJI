import { IBanner } from "@/types/Banner";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Skeleton } from "@heroui/react";
import "swiper/css";
import "swiper/css/pagination";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}
const HomeBanner = (props: PropTypes) => {
  const { banners, isLoadingBanners } = props;
  return (
    <div className=" mt-14 mb-6  ">
      <div>
        <h2 className="text-xl font-semibold mb-4">Temukan promo menarik</h2>
      </div>
      {!isLoadingBanners ? (
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          loop={false}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {banners.map((banner: IBanner, index: number) => (
            <SwiperSlide
              key={index}
              className="!w-[200px] md:!w-[220px] lg:!w-[240px]"
            >
              <div className="rounded-lg overflow-hidden bg-white shadow-sm relative h-[120px]">
                <Image
                  src={banner?.banner_image ?? ""}
                  alt={banner?.banner_name ?? ""}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex space-x-5 overflow-x-hidden">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-[200px] h-[120px] rounded-lg flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default HomeBanner;
