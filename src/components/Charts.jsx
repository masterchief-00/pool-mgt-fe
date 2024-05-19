import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "00:00", chlorine: 3.5, turbidity: 10, pH: 7.2 },
  { hour: "01:00", chlorine: 3.6, turbidity: 9, pH: 7.0 },
  { hour: "02:00", chlorine: 3.7, turbidity: 8, pH: 6.8 },
  { hour: "03:00", chlorine: 3.8, turbidity: 7, pH: 7.1 },
  { hour: "04:00", chlorine: 3.9, turbidity: 6, pH: 7.3 },
  { hour: "05:00", chlorine: 4.0, turbidity: 5, pH: 7.5 },
  { hour: "06:00", chlorine: 4.1, turbidity: 4, pH: 7.7 },
  { hour: "07:00", chlorine: 4.2, turbidity: 3, pH: 7.9 },
  { hour: "08:00", chlorine: 4.3, turbidity: 2, pH: 8.1 },
  { hour: "09:00", chlorine: 4.4, turbidity: 1, pH: 8.3 },
  { hour: "10:00", chlorine: 4.5, turbidity: 0, pH: 8.5 },
  { hour: "11:00", chlorine: 4.6, turbidity: 1, pH: 8.7 },
  { hour: "12:00", chlorine: 4.7, turbidity: 2, pH: 8.9 },
  { hour: "13:00", chlorine: 4.8, turbidity: 3, pH: 9.1 },
  { hour: "14:00", chlorine: 4.9, turbidity: 4, pH: 9.3 },
  { hour: "15:00", chlorine: 5.0, turbidity: 5, pH: 16 },
  { hour: "16:00", chlorine: 5.1, turbidity: 6, pH: 9.7 },
  { hour: "17:00", chlorine: 5.2, turbidity: 7, pH: 9.9 },
  { hour: "18:00", chlorine: 5.3, turbidity: 8, pH: 10.1 },
  { hour: "19:00", chlorine: 5.4, turbidity: 9, pH: 10.3 },
  { hour: "20:00", chlorine: 5.5, turbidity: 10, pH: 10.5 },
  { hour: "21:00", chlorine: 5.6, turbidity: 11, pH: 10.7 },
  { hour: "22:00", chlorine: 5.7, turbidity: 12, pH: 10.9 },
  { hour: "23:00", chlorine: 5.8, turbidity: 13, pH: 11.1 },
];

const WaterParametersChart = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Water Parameters Chart
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="chlorine" fill="#8884d8" name="Chlorine" />
          <Bar dataKey="turbidity" fill="#82ca9d" name="Turbidity" />
          <Bar dataKey="pH" fill="#ffc658" name="pH" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterParametersChart;
