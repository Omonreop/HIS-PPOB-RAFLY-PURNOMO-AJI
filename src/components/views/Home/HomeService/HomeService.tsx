import Image from "next/image";

import { IService } from "@/types/Services";
import Link from "next/link";

interface PropTypes {
  services: IService[];
  isLoading: boolean;
}

const HomeService = (props: PropTypes) => {
  const { services, isLoading } = props;

  return isLoading ? (
    <div className="flex  gap-9 mt-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-12 h-2 bg-gray-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-wrap gap-4 mt-4">
      {services.map((service) => (
        <Link
          key={service.service_code}
          href={`/payment/${service.service_code}`}
          className="flex flex-col items-center text-center w-16"
        >
          <div className="relative w-10 h-10 mb-1">
            <Image
              src={service.service_icon}
              alt={service.service_name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-center leading-snug max-w-[60px] whitespace-normal">
            {service.service_name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default HomeService;
