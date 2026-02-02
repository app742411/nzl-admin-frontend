//import LineChart from "../../components/charts/line/LineChart";
import LineChart from "../../charts/line/LineChartOne";
export default function SalesSummary() {
  return (
    <div className="bg-white rounded-xl p-5 xl:col-span-2 border border-gray-200">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Sales Summary</h3>
        <div className="flex gap-2">
          <button className="btn-primary">Daily</button>
          <button className="btn-ghost">Weekly</button>
          <button className="btn-ghost">Monthly</button>
        </div>
      </div>
      <LineChart />
    </div>
  );
}
