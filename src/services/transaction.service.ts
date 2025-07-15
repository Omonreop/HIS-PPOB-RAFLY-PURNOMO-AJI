import instance from "@/libs/axios/instance";
import { ITransaction } from "@/types/Transaction";
import endpoint from "./endpoint.constant";
import { ITopUp } from "@/types/TopUp";

const transactionServices = {
  createTransaction: (payload: ITransaction) =>
    instance.post(endpoint.TRANSACTION, payload),
  topUp: (payload: ITopUp) => instance.post(endpoint.TOPUP, payload),
  getTransactionHistory: (params?: { offset: number; limit: number }) =>
    instance.get(endpoint.TRANSACTION_HISTORY, { params }),
};
export default transactionServices;
