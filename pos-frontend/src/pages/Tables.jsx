import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getTables, updateTableStatus } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  // Fetch tables
  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  // Handle error
  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // Mutation to update table status
  const { mutate: changeStatus } = useMutation({
    mutationFn: updateTableStatus,
    onSuccess: () => {
      enqueueSnackbar("Table status updated!", { variant: "success" });
      queryClient.invalidateQueries(["tables"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to update table status.", { variant: "error" });
    },
  });

  // Filter tables based on status
  const filteredTables = resData?.data.data.filter(
    (table) => status === "all" || table.status.toLowerCase() === status
  );

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          {[
            { label: "All", value: "all" },
            { label: "Booked", value: "booked" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setStatus(value)}
              className={`text-[#ababab] text-lg ${
                status === value && "bg-[#383838] rounded-lg px-5 py-2"
              } rounded-lg px-5 py-2 font-semibold`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 px-16 py-4 h-[650px] overflow-y-scroll scrollbar-hide">
        {filteredTables && filteredTables.length > 0 ? (
          filteredTables.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
              onStatusChange={(id, newStatus) =>
                changeStatus({ id, status: newStatus })
              }
            />
          ))
        ) : (
          <p className="col-span-5 text-gray-500">No tables available</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
