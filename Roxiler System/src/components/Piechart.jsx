import { PieChart, Pie, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar as BarCharts } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

// Bar chart data for react-chartjs-2 (correct format)

function Piechart({ month }) {
  const [first, setfirst] = useState({});
  const [statistics, setStatistics] = useState({});
  const [category, setCategory] = useState({});
  
  useEffect(() => {
    async function getStatitics() {
      const data = await axios.get("http://localhost:3000/barchart", {
        params: { month },
      });
      const statistics = await axios.get("http://localhost:3000/statistics", {
        params: { month },
      });
      const category = await axios.get("http://localhost:3000/category", {
        params: { month },
      });
      setCategory(category.data);
      setfirst(data.data);
      setStatistics(statistics.data);
    }
    getStatitics();
  }, [month]);

  const barChartData = {
    labels: Object.keys(first),
    datasets: [
      {
        label: "Number of items",
        data: Object.values(first),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const convertToPieData = (inputObject) => {
    const colors = ["#2E96FF", "#02B2AF", "#9001CB", "#FF5733", "#FFBD33"];
    let colorIndex = 0;
  
    const pieData = Object.keys(inputObject).map((key) => {
      const dataObject = {
        name: key,
        value: inputObject[key],
        fill: colors[colorIndex],
      };
      colorIndex = (colorIndex + 1) % colors.length;
      return dataObject;
    });
  
    return pieData;
  };

  const pieData = convertToPieData(category);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <hr />
      <div className="flex flex-col mt-4 justify-center">
        <div className="w-full flex flex-wrap gap-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="w-6 h-4" style={{ backgroundColor: item.fill }}></span>
              <p className="text-sm md:text-base">{item.name} : {item.value}</p>
            </div>
          ))}
        </div>

        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <PieChart width={400} height={400} className="w-full h-auto">
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieData}
              outerRadius={150}
              fill="orangered"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="max-w-full md:max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
        <table className="min-w-full table-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="px-6 py-4 text-gray-700 font-semibold">Total Sale</td>
              <td className="px-6 py-4 text-gray-700">{statistics.totalSale}</td>
            </tr>
            <tr className="">
              <td className="px-6 py-4 text-gray-700 font-semibold">Total Sold Items</td>
              <td className="px-6 py-4 text-gray-700">{statistics.totalSoldItems}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-6 py-4 text-gray-700 font-semibold">Total Not Sold Items</td>
              <td className="px-6 py-4 text-gray-700">{statistics.totalUnsoldItems}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="w-full h-[400px]">
          <BarCharts data={barChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Piechart;
