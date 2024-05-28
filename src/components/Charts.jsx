import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WaterParametersChart = ({ data }) => {
  const yAxisTickFormatter = (value) => {
    return value.toFixed(2);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Water Parameters Chart
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" tickFormatter={yAxisTickFormatter} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={yAxisTickFormatter}
          />
          <YAxis
            yAxisId="middle"
            orientation="right"
            tickFormatter={yAxisTickFormatter}
          />

          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="tds"
            name="TDS (ppm)"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="middle"
            type="monotone"
            dataKey="ph"
            name="pH"
            stroke="#82ca9d"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tbdt"
            name="Turbidity (NTU)"
            stroke="#ff7300"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterParametersChart;
