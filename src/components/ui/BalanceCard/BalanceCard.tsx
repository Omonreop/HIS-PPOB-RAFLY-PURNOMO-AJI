interface BalanceCardProps {
  balance: string;
  isHidden?: boolean;
  onToggle?: () => void;
}

const BalanceCard = ({
  balance,
  isHidden = false,
  onToggle,
}: BalanceCardProps) => {
  return (
    <div
      className="relative w-full max-w-md rounded-xl overflow-hidden text-white px-6 py-4"
      style={{
        backgroundColor: "#EF4444", // fallback merah
        backgroundImage: `url("/images/general/saldo-bg.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "right bottom",
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm">Saldo anda</span>
        <span className="text-2xl font-bold tracking-wide">
          {isHidden ? "Rp ••••••••" : balance}
        </span>
        <button
          onClick={onToggle}
          className="text-xs underline text-white/90 hover:text-white mt-1 text-left"
        >
          {isHidden ? "Lihat Saldo 👁" : "Tutup Saldo 👁"}
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
