import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeLinksActions } from "../redux/slices/activeLinkSlice";
import { forecast, forecastActions } from "../redux/slices/forecastSlice";
import {
  predictionActions,
  predictionNow,
} from "../redux/slices/predictionSlice";

export const Predict = () => {
  const dispatch = useDispatch();
  const forecastState = useSelector((state) => state.forecast);
  const forecastAdvState = useSelector((state) => state.prediction);

  const [forecastData, setForecastData] = useState({
    day: null,
    hour: null,
  });
  const [forecastResponse, setForecastResponse] = useState();
  const [forecastAdvResponse, setForecastAdvResponse] = useState();
  const [predictionError, setPredictionError] = useState(false);

  const hours = [
    { val: 8, label: "8 AM" },
    { val: 9, label: "9 AM" },
    { val: 10, label: "10 AM" },
    { val: 11, label: "11 AM" },
    { val: 12, label: "12 PM" },
    { val: 13, label: "1 PM" },
    { val: 14, label: "2 PM" },
    { val: 15, label: "3 PM" },
    { val: 16, label: "4 PM" },
    { val: 17, label: "5 PM" },
    { val: 18, label: "6 PM" },
    { val: 19, label: "7 PM" },
    { val: 20, label: "8 PM" },
  ];

  const handleForecastAdvanced = () => {
    setPredictionError(false);
    dispatch(predictionActions.resetData());
    dispatch(predictionNow());
  };

  const handleForecast = (e) => {
    e.preventDefault();

    if (forecastData.day < 1 || forecastData.hour < 1) return;

    dispatch(forecastActions.resetData());
    dispatch(forecast(forecastData));
  };

  const handleInput = (e) => {
    e.preventDefault();

    setForecastData((prevState) => ({
      ...prevState,
      hour: e.target.name === "hour" ? e.target.value : prevState.hour,
      day: e.target.name === "day" ? e.target.value : prevState.day,
    }));
  };

  useEffect(() => {
    if (forecastAdvState.serverResponded) {
      console.log(forecastAdvState.response);
      if (forecastAdvState.response.error) setPredictionError(true);
      setForecastAdvResponse(forecastAdvState.response);
    }
  }, [forecastAdvState.serverResponded]);

  useEffect(() => {
    if (forecastState.serverResponded) {
      setForecastResponse(forecastState.response);
    }
  }, [forecastState.serverResponded]);

  useEffect(() => {
    dispatch(activeLinksActions.setActiveLink("Prediction"));

    return () => {
      dispatch(predictionActions.resetData());
      dispatch(forecastActions.resetData());
      setForecastAdvResponse();
      setForecastData({
        day: null,
        hour: null,
      });
    };
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2">
      <div className="w-full h-fit rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
        <div className="flex flex-col gap-3 justify-between h-fit">
          <div className="flex flex-col gap-1 w-full h-full">
            <label className="font-bold text-2xl">Prediction</label>
            <label className="font-semibold text-sm text-gray-600">
              Selective
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" font-semibold">
              Use this interface to run prediction for a specific time of the
              week with an accuracy of over 88%
            </p>

            <form onSubmit={handleForecast}>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2 w-[20%]">
                  <label>Choose day:</label>
                  <select
                    name="day"
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    onChange={handleInput}
                    id="day"
                  >
                    <option value="0"></option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="7">Sunday</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 w-[20%]">
                  <label>Choose hour:</label>
                  <select
                    name="hour"
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    onChange={handleInput}
                    id="hour"
                  >
                    <option value="0"></option>
                    {hours.map((item) => (
                      <option key={item.val} value={item.val}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" self-end">
                  <button
                    type="submit"
                    disabled={forecastState.loading}
                    className={`${
                      forecastState.loading
                        ? " bg-gray-400 opacity-35"
                        : "bg-blue-500"
                    } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  >
                    Predict
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {forecastResponse && (
        <div className="w-full h-fit rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-2xl">Prediction results:</label>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-row gap-2">
              <div
                className={`flex flex-col gap-3 w-[10%] border-[1px] ${
                  (forecastResponse?.pH <= 7.8) & (forecastResponse?.pH >= 7.2)
                    ? " bg-green-100"
                    : "bg-red-100"
                } bg-gray-100 border-gray-500 rounded-md p-2`}
              >
                <label className="font-bold text-3xl">pH</label>
                <label className=" font-medium text-md">
                  {forecastResponse?.pH.toFixed(2)}
                </label>
              </div>
              <div
                className={`flex flex-col gap-3 min-w-[10%] border-[1px] ${
                  forecastResponse.Turbidity <= 50
                    ? " bg-green-100"
                    : "bg-red-100"
                }  border-gray-500 rounded-md p-2`}
              >
                <label className="font-bold text-3xl">Turbidity</label>
                <label className=" font-medium text-md">
                  {forecastResponse.Turbidity.toFixed(2)} NTU
                </label>
              </div>
              <div
                className={`flex flex-col gap-3 min-w-[10%] border-[1px] ${
                  forecastResponse?.Conductivity <= 2000
                    ? " bg-green-100"
                    : "bg-red-100"
                } bg-gray-100 border-gray-500 rounded-md p-2`}
              >
                <label className="font-bold text-3xl">Conductivity</label>
                <label className=" font-medium text-md">
                  {forecastResponse?.Conductivity.toFixed(2)} ppm
                </label>
              </div>
            </div>
            <div>
              {(forecastResponse?.Conductivity <= 2000) &
              (forecastResponse.Turbidity <= 50) &
              (forecastResponse?.pH <= 7.8) &
              (forecastResponse?.pH >= 7.2) ? (
                <p className=" font-semibold text-green-500">
                  The prediction indicates that the water parameters are going
                  to be safe for the time predicted, act accordingly.
                </p>
              ) : (
                <p className=" font-semibold text-red-500">
                  The prediction indicates that the water parameters are going
                  to be unsafe for the time predicted, act accordingly.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-fit rounded-lg shadow-gray-400 bg-white p-4 overflow-hidden">
        <div className="flex flex-col gap-3 justify-between h-fit">
          <div className="flex flex-col gap-1 w-full h-full">
            <label className="font-bold text-2xl">
              Maintainance prediction
            </label>
            <label className="font-semibold text-sm text-gray-600">
              advanced
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <p className=" font-semibold">
              Use this interface to predict when the current swimming pool will
              need to be cleaned
            </p>

            <div className="flex flex-row gap-1">
              <label className=" font-normal">
                Next cleaning estimated time:
              </label>
              {forecastAdvResponse && !predictionError ? (
                <label className=" font-semibold text-green-400">
                  {forecastAdvResponse.hour < 1
                    ? "Exactly now"
                    : forecastAdvResponse.hour}
                </label>
              ) : (
                <a
                  href="#"
                  onClick={() => handleForecastAdvanced()}
                  className=" font-semibold text-blue-600 underline"
                >
                  [never predicted, click to predict]
                </a>
              )}

              {forecastAdvResponse && !predictionError && (
                <a
                  href="#"
                  onClick={() => handleForecastAdvanced()}
                  className=" font-bold text-purple-500 underline ml-10"
                >
                  predict again?
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
