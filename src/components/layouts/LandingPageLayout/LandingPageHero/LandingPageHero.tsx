import BalanceCard from "@/components/ui/BalanceCard";
import Image from "next/image";
import { useState } from "react";
import useLandingPageHero from "./useLandingPageHero";
import { convertIDR } from "@/utils/currency";

const LandingPageHero = () => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleBalance = () => setIsHidden(!isHidden);
  const { dataProfile, dataBalance } = useLandingPageHero();
  return (
    <section className="flex flex-row  justify-between items-start md:items-center gap-4 py-6 px-[10rem]">
      <div className="flex flex-col items-start gap-4">
        <Image
          src={dataProfile?.profile_image}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="text-sm text-default-500">Selamat datang,</p>
          <p className="text-lg font-semibold text-black">{`${dataProfile?.first_name} ${dataProfile?.last_name}`}</p>
        </div>
      </div>

      <div className="w-full md:max-w-sm">
        <BalanceCard
          balance={convertIDR(dataBalance?.balance)}
          isHidden={isHidden}
          onToggle={toggleBalance}
        />
      </div>
    </section>
  );
};

export default LandingPageHero;
