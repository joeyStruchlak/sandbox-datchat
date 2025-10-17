import { TrendingUp, DollarSign, BarChart3, Activity } from "lucide-react";

interface SummaryMetric {
  label: string;
  value: number;
  formattedValue: string;
  type: string;
}

interface SummaryData {
  totalRecords: number;
  metrics: SummaryMetric[];
}

interface SummaryCardProps {
  summaryData: SummaryData;
}

export default function SummaryCard({ summaryData }: SummaryCardProps) {
  const icons = [DollarSign, TrendingUp, BarChart3, Activity];

  const colors = [
    {
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "#ffffff",
      border: "#764ba2",
      text: "#ffffff",
    },
    {
      bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "#ffffff",
      border: "#f5576c",
      text: "#ffffff",
    },
    {
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "#ffffff",
      border: "#00f2fe",
      text: "#ffffff",
    },
    {
      bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "#ffffff",
      border: "#38f9d7",
      text: "#ffffff",
    },
  ];

  return (
    <div className="my-8 p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
          Executive Summary
        </h3>
        <p className="text-base text-gray-600 font-medium">
          Comprehensive analysis of {summaryData.totalRecords.toLocaleString()}{" "}
          records with key financial metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="rounded-2xl p-7 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderColor: "#764ba2",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-5xl font-black text-white mb-2 tracking-tight">
            {summaryData.totalRecords.toLocaleString()}
          </div>
          <div className="text-base font-bold text-white/90 mb-1">
            Total Records
          </div>
          <div className="text-sm text-white/75 font-medium">
            Dataset analyzed
          </div>
        </div>

        {summaryData.metrics.slice(0, 3).map((metric, index) => {
          const Icon = icons[index + 1];
          const color = colors[index + 1];

          return (
            <div
              key={index}
              className="rounded-2xl p-7 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{
                background: color.bg,
                borderColor: color.border,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                >
                  <Icon className="w-8 h-8" style={{ color: color.icon }} />
                </div>
              </div>
              <div
                className="text-5xl font-black mb-2 tracking-tight"
                style={{ color: color.text }}
              >
                {metric.formattedValue}
              </div>
              <div
                className="text-base font-bold mb-1"
                style={{ color: color.text, opacity: 0.9 }}
              >
                {metric.label}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: color.text, opacity: 0.75 }}
              >
                {metric.label.includes("Average")
                  ? "Mean value"
                  : "Aggregate total"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Metrics if more than 3 */}
      {summaryData.metrics.length > 3 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.metrics.slice(3).map((metric, index) => {
            const Icon = icons[(index + 4) % icons.length];
            const color = colors[(index + 4) % colors.length];

            return (
              <div
                key={index + 3}
                className="rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                style={{
                  backgroundColor: color.bg,
                  borderColor: color.border,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: color.icon }} />
                  </div>
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: color.icon }}
                >
                  {metric.formattedValue}
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  {metric.label}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {metric.label.includes("Average")
                    ? "Mean value"
                    : "Aggregate total"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <p className="text-sm text-gray-600 text-center font-medium">
          📊 Complete dataset available for detailed analysis and export below
        </p>
      </div>
    </div>
  );
}
