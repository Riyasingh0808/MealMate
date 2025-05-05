import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats, onStatusChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Booked") return;
    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer h-[220px] relative"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
          {name}
        </h1>
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } px-2 py-1 rounded-lg text-sm`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center mt-5 mb-8">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>

      <p className="text-[#ababab] text-xs mb-1">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>

      {onStatusChange && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering table selection
            const newStatus = status === "Booked" ? "Available" : "Booked";
            onStatusChange(id, newStatus);
          }}
          className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
        >
          {status === "Booked" ? "Mark as Available" : "Book Table"}
        </button>
      )}
    </div>
  );
};

export default TableCard;
