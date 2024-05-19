import React from "react";

function ParameterCard({ title, value, status, unit = null }) {
  return (
    <div className=" flex flex-col justify-between w-[33%] h-40 border-2 border-black p-3">
      <h2 className=" font-bold text-3xl">{title}</h2>
      <div className="flex flex-row  justify-between">
        <p className=" text-2xl">
          {value} {unit && unit}
        </p>
        <button className=" bg-red-400 rounded-full text-white px-1 py-0 text-sm">
          {status}
        </button>
      </div>
    </div>
  );
}

export default ParameterCard;
