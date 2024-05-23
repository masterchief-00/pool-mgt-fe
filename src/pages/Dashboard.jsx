import React, { useEffect, useState } from "react";

import WaterParametersChart from "../components/Charts";
import ParameterCard from "../components/ParameterCard";
import connectMQTT from "../service/connectMQTT";
import { useDispatch, useSelector } from "react-redux";
import { predictionNow } from "../redux/slices/predictionSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const predictionState = useSelector((state) => state.prediction);

  const [isOpen, setIsOpen] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [maintainancePrediction, setMaintainancePrediction] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePrediction = () => {
    if (predictionState.loading) return;
    dispatch(predictionNow());
  };

  useEffect(() => {
    if (predictionState.serverResponded) {
      setMaintainancePrediction(predictionState.response);
      console.log(predictionState.response);
    }
  }, [predictionState.serverResponded]);

  useEffect(() => {
    // Connect to MQTT and handle incoming messages
    const client = connectMQTT((topic, message) => {
      // console.log(`Received message: ${message} on topic: ${topic}`);
      const data = JSON.parse(message);
      setSensorData(data);
    });

    dispatch(predictionNow());

    // Clean up the connection on unmount
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <div className=" flex flex-col gap-2 w-full h-full p-2">
      <div className="flex items-center justify-center m-10">
        <div>
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Choose swimming pool
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute mt-[14%] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-0"
              >
                Pool A
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-1"
              >
                Pool B
              </a>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Pool C
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* <div className="h-screen bg-cover " style={{ backgroundImage: `url('/assets/pexels-pixabay-261411.jpg')` }}> */}
      <div className="flex flex-row justify-around w-full">
        <ParameterCard
          title={"pH Value"}
          value={sensorData?.ph.toFixed(2) || 0}
          color="bg-[#F6DCAC]"
          status={
            sensorData?.ph > 7.1 && sensorData?.ph < 7.3 ? "Safe" : "Not Safe"
          }
        />
        <ParameterCard
          title={"Turbidity"}
          value={Math.max(0, sensorData?.tbdt.toFixed(2)) || 0}
          unit={"NTU"}
          color="bg-[#FEAE6F]"
          status={sensorData?.tbdt <= 50 ? "Safe" : "Not Safe"}
        />
        <ParameterCard
          title={"Conductivity"}
          value={sensorData?.tds.toFixed(2) || 0}
          unit={"ppm"}
          color="bg-[#F6F193]"
          status={sensorData?.tds < 2001 ? "Safe" : "Not Safe"}
        />
      </div>
      <div className="p-3 border-[1px] border-gray-400 shadow-md rounded-md">
        <div className="flex flex-row justify-between">
          <div className="w-[65%] h-52">
            <h3 className=" font-bold text-3xl">Prediction</h3>
            <p className=" font-semibold text-xl">
              This prediction is performed by the trained model to determine
              when the next maintenance or the next water cleaning for the
              swimming pool needs to be done. Click the button to refresh the
              prediction.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center gap-2 w-[24%]">
            <div className="flex flex-col justify-center items-center bg-[#A5DD9B] border border-1 border-gray-400 shadow-md rounded-full px-14 py-20">
              <div className="flex flex-col justify-center items-center w-full">
                <label className="text-1xl">In the next</label>
                <label className=" font-semibold text-3xl text-center text-nowrap">
                  {maintainancePrediction?.hour || 0} hour(s)
                </label>
              </div>
            </div>
            <a
              href="#"
              onClick={() => handlePrediction()}
              className={`w-[80%] p-2 font-semibold text-sm text-center border border-1 bg-[#96C291] rounded-md border-black ${
                predictionState.loading && "opacity-45"
              }`}
            >
              Run prediction
            </a>
          </div>
        </div>
      </div>

      <WaterParametersChart />
    </div>
  );
}

export default Dashboard;
