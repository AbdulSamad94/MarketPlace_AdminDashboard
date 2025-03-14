import React from "react";
import KeyMetrics from "@/components/Charts/KeyMetric";
import SalesChart from "@/components/Charts/SalesChart";
import OrderHistory from "@/components/OrderHistory";
export default async function Home() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-black">
        Admin Dashboard
      </h1>
      <KeyMetrics />
      <SalesChart />
      <OrderHistory />
    </div>
  );
}
