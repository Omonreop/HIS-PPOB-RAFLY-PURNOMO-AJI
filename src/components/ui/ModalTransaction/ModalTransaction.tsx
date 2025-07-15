import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@heroui/react";
import { FaCheckCircle, FaTimesCircle, FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";
import { TransactionStatus } from "./useModalTransaction";
import { convertIDR } from "@/utils/currency";

interface ModalTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  modalType: TransactionStatus;
  amount: number;
  title: string;
  onConfirm: () => void;
  isPending?: boolean;
}

const ModalTransaction = ({
  isOpen,
  onClose,
  onOpenChange,
  modalType,
  amount,
  title,
  onConfirm,
  isPending = false,
}: ModalTransactionProps) => {
  const router = useRouter();

  const renderIcon = () => {
    switch (modalType) {
      case "SUCCESS":
        return <FaCheckCircle size={64} className="text-green-500 mb-2" />;
      case "FAILED":
        return <FaTimesCircle size={64} className="text-red-500 mb-2" />;
      default:
        return <FaWallet size={64} className="text-[#F2271C] mb-2" />;
    }
  };

  const renderContent = () => {
    if (modalType === "CONFIRM") {
      return (
        <>
          <ModalHeader className="flex flex-col items-center justify-center">
            {renderIcon()}
            <p className="text-lg font-semibold text-center">
              Lanjutkan Pembayaran?
            </p>
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{title} senilai:</p>
            <p className="text-xl font-bold text-gray-800">
              {convertIDR(amount)}
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center gap-2">
            <Button
              className="bg-white text-red-500 font-semibold hover:bg-red-500 hover:text-white"
              onPress={onConfirm}
              isLoading={isPending}
            >
              Ya, lanjutkan bayar
            </Button>
            <Button
              variant="light"
              className="text-gray-600"
              onPress={onClose}
              isDisabled={isPending}
            >
              Batal
            </Button>
          </ModalFooter>
        </>
      );
    }

    return (
      <>
        <ModalHeader className="flex flex-col items-center justify-center">
          {renderIcon()}
          <p className="text-lg font-semibold">
            {modalType === "SUCCESS"
              ? "Pembayaran Berhasil"
              : "Pembayaran Gagal"}
          </p>
        </ModalHeader>
        <ModalBody className="text-center">
          <p>
            {title} sebesar <br />
            <span className="text-xl font-bold text-gray-800">
              {convertIDR(amount)}
            </span>
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button
            variant="light"
            className="text-[#F2271C] font-semibold"
            onPress={() => router.push("/")}
          >
            Kembali ke Beranda
          </Button>
        </ModalFooter>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      placement="center"
      backdrop="opaque"
      className="rounded-lg"
    >
      <ModalContent>{renderContent()}</ModalContent>
    </Modal>
  );
};

export default ModalTransaction;
