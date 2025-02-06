// components/KeyMetrics.tsx
import React from "react";

interface MetricCardProps {
  title: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const KeyMetrics: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <MetricCard title="Total Products" value={150} />
    <MetricCard title="Total Sales" value={1200} />
    <MetricCard title="Total Users" value={300} />
  </div>
);

export default KeyMetrics;
