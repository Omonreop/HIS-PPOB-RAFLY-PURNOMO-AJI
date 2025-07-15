import { Input } from "@heroui/react";
import { FaRegCreditCard } from "react-icons/fa";
import { useState } from "react";
import { convertIDR } from "@/utils/currency";
import useModalTransaction from "@/components/ui/ModalTransaction/useModalTransaction";
import ModalTransaction from "@/components/ui/ModalTransaction/ModalTransaction";

const predefinedAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUp = () => {
  const [amount, setAmount] = useState<number>(0);

  const modal = useModalTransaction({
    type: "TOPUP",
    amount,
  });

  const handleInputChange = (value: string) => {
    const numeric = parseInt(value.replace(/\D/g, ""));
    setAmount(isNaN(numeric) ? 0 : numeric);
  };

  const handlePresetClick = (value: number) => {
    setAmount(value);
  };

  return (
    <div className="mx-[10rem]">
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Top Up</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 ">
            <Input
              variant="bordered"
              autoComplete="off"
              radius="sm"
              type="text"
              inputMode="numeric"
              className="mb-3"
              value={amount ? convertIDR(amount) : ""}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Masukkan nominal Top Up"
              startContent={
                <span className="text-default-400">
                  <FaRegCreditCard size={14} />
                </span>
              }
            />
            <button
              onClick={modal.openModal}
              disabled={amount < 1000}
              className="w-full bg-[#F2271C] hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded"
            >
              Top Up
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {predefinedAmounts.map((val) => (
              <button
                key={val}
                onClick={() => handlePresetClick(val)}
                className="border border-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-100"
              >
                {convertIDR(val)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ModalTransaction
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        onOpenChange={modal.onOpenChange}
        modalType={modal.modalType}
        amount={amount}
        title="Top Up"
        onConfirm={modal.handleTransaction}
        isPending={modal.isPending}
      />
    </div>
  );
};

export default TopUp;
