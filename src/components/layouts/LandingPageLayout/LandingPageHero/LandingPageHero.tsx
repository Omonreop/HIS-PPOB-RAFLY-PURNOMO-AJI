import BalanceCard from "@/components/ui/BalanceCard";
import Image from "next/image";
import { useState } from "react";
import useLandingPageHero from "./useLandingPageHero";
import { convertIDR } from "@/utils/currency";
import { Skeleton } from "@heroui/react";

const LandingPageHero = () => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleBalance = () => setIsHidden(!isHidden);
  const { dataProfile, dataBalance } = useLandingPageHero();

  return (
    <section className="flex flex-row justify-between items-start md:items-center gap-4 py-6 px-[10rem]">
      <div className="flex flex-col items-start gap-4">
        <Skeleton
          isLoaded={!!dataProfile?.profile_image}
          className="rounded-full"
        >
          <Image
            src={
              dataProfile?.profile_image ||
              "/images/ilustration/Profile-Photo.png"
            }
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Skeleton>

        <div>
          <Skeleton isLoaded={!!dataProfile?.first_name} className="mb-1">
            <p className="text-sm text-default-500">Selamat datang,</p>
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.first_name}>
            <p className="text-lg font-semibold text-black">
              {`${dataProfile?.first_name} ${dataProfile?.last_name}`}
            </p>
          </Skeleton>
        </div>
      </div>

      <div className="w-full md:max-w-sm">
        <Skeleton isLoaded={!!dataBalance?.balance} className="rounded-lg">
          <BalanceCard
            balance={convertIDR(dataBalance?.balance)}
            isHidden={isHidden}
            onToggle={toggleBalance}
          />
        </Skeleton>
      </div>
    </section>
  );
};

export default LandingPageHero;
