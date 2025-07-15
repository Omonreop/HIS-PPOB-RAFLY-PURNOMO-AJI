import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { convertIDR } from "@/utils/currency";
import { useHistoryTransaction } from "./useHistoryTransaction";

const HistoryTransaction = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHistoryTransaction();

  const allRecords = data?.pages.flatMap((page) => page.records) || [];

  return (
    <div className="mx-[10rem]">
      <h2 className="text-lg font-semibold mb-4">Semua Transaksi</h2>

      {isLoading && <p className="text-gray-500">Memuat data...</p>}
      {isError && <p className="text-red-500">Gagal memuat data.</p>}

      {allRecords.map((item) => {
        const isTopUp = item.transaction_type === "TOPUP";
        const sign = isTopUp ? "+" : "−";
        const color = isTopUp ? "text-green-500" : "text-red-500";

        return (
          <div
            key={item.invoice_number}
            className="flex justify-between items-center border rounded-lg px-4 py-3 mb-3"
          >
            <div>
              <p className={`font-semibold ${color}`}>
                {sign} {convertIDR(item.total_amount)}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(item.created_on), "d MMMM yyyy  HH:mm", {
                  locale: id,
                })}{" "}
                WIB
              </p>
            </div>
            <p className="text-sm text-gray-700 text-right max-w-[40%]">
              {item.description}
            </p>
          </div>
        );
      })}

      {hasNextPage && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-red-500 text-sm hover:underline disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryTransaction;
