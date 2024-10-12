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
      setCategory(category.data)
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

  // console.log(first);
  // console.log(statistics);
  // console.log(category);
  const convertToPieData = (inputObject) => {
    const colors = ["#2E96FF", "#02B2AF", "#9001CB", "#FF5733", "#FFBD33"]; // Add more colors if needed
    let colorIndex = 0;
  
    const pieData = Object.keys(inputObject).map((key) => {
      const dataObject = {
        name: key,  // Use the key (e.g., 'electronics', 'clothing') as name
        value: inputObject[key], // Use the value from the input object
        fill: colors[colorIndex]  // Assign a color from the colors array
      };
  
      colorIndex = (colorIndex + 1) % colors.length; // Loop through colors
      return dataObject;
    });
  
    return pieData;
  };
  const pieData = convertToPieData(category);
  console.log(pieData);
  
  return (
    <div>
      <hr />
      <div className="flex flex-col mt-4 justify-center">
        <div className="w-full flex items-center ">
          {
            pieData.map((item, index)=>(
              <div className="" key={index}>

              <div className="flex items-center gap-1">
              <span className="w-6 h-4 " style={{ backgroundColor: item.fill }}></span><p className="w-full text-nowrap"  key={index}>{item.name} : {item.value}</p>
              </div>
              </div>
            ))
          }
        </div>
        <PieChart width={800} height={800}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieData}
            outerRadius={200}
            fill="orangered"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
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


      <div style={{ width: "600px", height: "400px" }}>
        <BarCharts data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Piechart;
