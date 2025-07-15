import Image from "next/image";
import { FaRegCreditCard } from "react-icons/fa";
import usePayment from "./usePayment";
import { Input } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import ModalTransaction from "@/components/ui/ModalTransaction/ModalTransaction";
import useModalTransaction from "@/components/ui/ModalTransaction/useModalTransaction";

const Payment = () => {
  const { service, isLoading, isError } = usePayment();
  const modal = useModalTransaction({
    type: "PAYMENT",
    serviceCode: service?.service_code,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !service)
    return (
      <p className="text-center mt-10 text-red-500">Gagal memuat layanan</p>
    );
  return (
    <div className="mx-[10rem]">
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Pembayaran</p>
        <div className="flex items-center gap-3 pb-4">
          <Image
            src={service?.service_icon}
            alt={service?.service_name}
            width={24}
            height={24}
          />
          <span className="font-semibold">{service.service_name}</span>
        </div>
      </div>

      <div className="mb-4">
        <Input
          variant="bordered"
          autoComplete="off"
          radius="sm"
          disabled
          className="cursor-pointer"
          value={convertIDR(service.service_tariff)}
          startContent={
            <span className="text-default-400">
              <FaRegCreditCard size={14} />
            </span>
          }
        />
      </div>

      <button
        className="w-full bg-[#F2271C] hover:bg-red-600 text-white text-sm font-medium py-2 rounded"
        onClick={modal.openModal}
      >
        Bayar
      </button>

      <ModalTransaction
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        onOpenChange={modal.onOpenChange}
        modalType={modal.modalType}
        amount={service.service_tariff}
        title={service.service_name}
        onConfirm={modal.handleTransaction}
        isPending={modal.isPending}
      />
    </div>
  );
};

export default Payment;
