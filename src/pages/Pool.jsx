import React, { useEffect, useState } from "react";

import WaterParametersChart from "../components/Charts";
import ParameterCard from "../components/ParameterCard";
import { useDispatch, useSelector } from "react-redux";
import { predictionNow } from "../redux/slices/predictionSlice";
import { useParams } from "react-router-dom";
import MQTTlive from "../service/MQTTlive";

function Pool() {
  const MAX_DATA_POINTS = 120;

  let { topic } = useParams();
  const dispatch = useDispatch();
  const predictionState = useSelector((state) => state.prediction);

  const [isOpen, setIsOpen] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [maintainancePrediction, setMaintainancePrediction] = useState(null);
  const [chartData, setChartData] = useState([]);

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
    const client = MQTTlive(topic, (topic, message) => {
      // console.log(`Received message: ${message} on topic: ${topic}`);
      const data = JSON.parse(message);
      const time = new Date().toLocaleTimeString();
      setChartData((prevData) => {
        const newData = [
          ...prevData,
          {
            time,
            tbdt: data.tbdt.toFixed(2),
            ph: data.ph.toFixed(2),
            tds: data.tds.toFixed(2),
          },
        ];
        if (newData.length > MAX_DATA_POINTS) {
          newData.shift(); // Remove the oldest data point to keep the array size within the limit
        }
        return newData;
      });
      setSensorData(data);
    });

    dispatch(predictionNow());

    // Clean up the connection on unmount
    return () => {
      if (client) {
        console.log("MQTT disconnect");
        client.disconnect();
      }
    };
  }, []);

  return (
    <div className=" flex flex-col gap-2 w-full h-full p-2 overflow-y-scroll">
      {/* <div className="h-screen bg-cover " style={{ backgroundImage: `url('/assets/pexels-pixabay-261411.jpg')` }}> */}
      <div className="flex flex-row justify-around w-full">
        <ParameterCard
          title={"pH Value"}
          value={sensorData?.ph.toFixed(2) || 0}
          color="bg-white"
          status={
            sensorData?.ph > 7.1 && sensorData?.ph < 7.3 ? "Safe" : "Not Safe"
          }
        />
        <ParameterCard
          title={"Turbidity"}
          value={Math.max(0, sensorData?.tbdt.toFixed(2)) || 0}
          unit={"NTU"}
          color="bg-white"
          status={sensorData?.tbdt <= 50 ? "Safe" : "Not Safe"}
        />
        <ParameterCard
          title={"Conductivity"}
          value={sensorData?.tds.toFixed(2) || 0}
          unit={"ppm"}
          color="bg-white"
          status={sensorData?.tds < 2001 ? "Safe" : "Not Safe"}
        />
      </div>
      <div className="p-3 border-[1px] bg-white border-gray-400 shadow-md rounded-md">
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

      <div className="w-full p-3 border-[1px] bg-white border-gray-400 shadow-md rounded-md">
        <WaterParametersChart data={chartData} />
        <div className="h-[25%]" />
      </div>
    </div>
  );
}

export default Pool;
