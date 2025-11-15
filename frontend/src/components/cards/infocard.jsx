import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Icon circle */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl ${color}`}
      >
        {icon}
      </div>

      {/* Label and Value */}
      <div>
        <h6 className="text-gray-500 text-sm font-medium">{label}</h6>
        <span className="text-2xl font-semibold text-gray-900">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
