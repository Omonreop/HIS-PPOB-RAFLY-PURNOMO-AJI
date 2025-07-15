import { useDisclosure } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import transactionService from "@/services/transaction.service";

export type TransactionStatus = "CONFIRM" | "SUCCESS" | "FAILED";

type Props = {
  type: "TOPUP" | "PAYMENT";
  serviceCode?: string; // required for PAYMENT
  amount?: number; // required for TOPUP
};

const useModalTransaction = ({ type, serviceCode, amount }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<TransactionStatus>("CONFIRM");

  const { mutate: handleTransaction, isPending } = useMutation({
    mutationFn: async () => {
      if (type === "TOPUP" && amount) {
        return await transactionService.topUp({ top_up_amount: amount });
      } else if (type === "PAYMENT" && serviceCode) {
        return await transactionService.createTransaction({
          service_code: serviceCode,
        });
      } else {
        throw new Error("Invalid parameters");
      }
    },
    onSuccess: () => setModalType("SUCCESS"),
    onError: () => setModalType("FAILED"),
    retry: false,
  });

  const openModal = () => {
    setModalType("CONFIRM");
    onOpen();
  };

  const closeModal = () => {
    setModalType("CONFIRM");
    onClose();
  };

  return {
    isOpen,
    onOpenChange,
    onClose,
    modalType,
    openModal,
    closeModal,
    handleTransaction,
    isPending,
  };
};

export default useModalTransaction;
