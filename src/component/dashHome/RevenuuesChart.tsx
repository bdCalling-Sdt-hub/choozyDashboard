import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";
import SelectBox from "../share/SelectBox";
import { useGetDashHomeStatusApiQuery } from "../../redux/features/getDashHomeStatusApi";

// Define the type for each data point
interface DataPoint {
  name: string;
  amt: number;
}

const RevenueChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly"); // Default to monthly
  const { data: RevenueData, isSuccess, isError, isLoading } = useGetDashHomeStatusApiQuery(selectedPeriod);


  // Map the API data into the format Recharts expects
  const data =
    isSuccess && RevenueData?.data?.activities?.monthlyRevenue
    
      ? RevenueData.data.activities.monthlyRevenue.map((item: { month: string; revenue: string }) => ({
          name: item.month,
          amt: parseFloat(item.revenue), // Ensure revenue is converted to a number
        }))
      : [];

  // Format the Y-axis values (e.g., 0k, 2k)
  const formatYAxis = (tickItem: number) => {
    return `${tickItem / 1000}k`;
  };

  // Handle Select Box change
  const handleSelectChange = (value: string) => {
    setSelectedPeriod(value);
  };

  // SelectBox options
  const selectOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  // Handling different states (loading, error, etc.)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="bg-[#FFFFFF] rounded-2xl mt-2 p-2 text-gray-300 pr-14">
      <div className="flex justify-between">
        <Title className="mb-5">Statistics Analytics</Title>
        {/* <SelectBox
          options={selectOptions}
          placeholder="Period"
          onChange={handleSelectChange}
          style={{ width: 100 }}
        /> */}
      </div>
      <Title className="mb-5">Revenue</Title>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} syncId="anyId">
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D6FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00D6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} dataKey="name" />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]} // Adjust ticks as needed
            interval={0} // Show all ticks
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="url(#colorAmt)"
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
