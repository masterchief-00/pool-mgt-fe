import React from "react";
import { HistoryGraph } from "../components/HistoryGraph";

export const HistoricalData = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2">
      <div className="w-full h-fit rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
        <div className="flex flex-row justify-between h-fit">
          <div className="flex flex-col gap-1 w-full h-full">
            <label className="font-bold text-2xl">Historical Data</label>
            <label className="font-semibold text-md text-gray-600">
              2023 data
            </label>
          </div>
        </div>
        <div className="h-full overflow-y-scroll">
          <HistoryGraph />
          <div className="h-[25%]" />
        </div>
      </div>
    </div>
  );
};
