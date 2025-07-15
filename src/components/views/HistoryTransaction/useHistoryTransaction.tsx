import transactionServices from "@/services/transaction.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface TransactionItem {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

interface HistoryResponse {
  records: TransactionItem[];
  offset: number;
  limit: number;
}

const LIMIT = 3;

export const useHistoryTransaction = () => {
  return useInfiniteQuery<HistoryResponse, Error>({
    queryKey: ["history-transactions"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await transactionServices.getTransactionHistory({
        offset: Number(pageParam),
        limit: LIMIT,
      });
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.records.length < LIMIT) return undefined;
      return lastPage.offset + LIMIT;
    },
  });
};
