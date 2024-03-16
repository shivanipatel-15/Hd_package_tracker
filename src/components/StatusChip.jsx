import React from "react";

const StatusChip = ({ status }) => {
  let bgColor;

  switch (status) {
    case "Shipped":
      bgColor = "bg-yellow-400";
      break;
    case "In-Transit":
      bgColor = "bg-cyan-300";
      break;
    case "Delivered":
      bgColor = "bg-lime-400";
      break;
    case "Cancelled":
      bgColor = "bg-red-400";
      break;
    default:
      bgColor = "bg-gray-500";
  }

  return (
    <div
      className={`inline-block px-3 py-1 text-white rounded-full ${bgColor}`}
    >
      {status}
    </div>
  );
};

export default StatusChip;
