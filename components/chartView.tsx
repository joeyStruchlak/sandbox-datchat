// // components/ChartView.tsx
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// type ChartViewProps = {
//   data: any[];
// };

// export default function ChartView({ data }: ChartViewProps) {
//   if (!data || data.length === 0) return null;

//   // Auto pick first two numeric fields or fallback to known keys
//   const first = data[0];
//   const keys = Object.keys(first);

//   const labelKey = keys[0]; // x-axis
//   const valueKey = keys.find((k) => typeof first[k] === "number") || keys[1]; // y-axis

//   const chartData = {
//     labels: data.map((d) => d[labelKey]),
//     datasets: [
//       {
//         label: valueKey,
//         data: data.map((d) => d[valueKey]),
//         backgroundColor: "#5a8068",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top" as const,
//       },
//     },
//   };

//   return (
//     <div className="my-4 p-4 bg-white border border-gray-200 rounded-xl">
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// }

// NOT BAD// BUT NEEDS MORE FEATURES
// import React, { useState, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// type ChartViewProps = {
//   data: any[];
// };

// function downloadCSV(data: any[], filename = "data.csv") {
//   if (!data || data.length === 0) return;
//   const keys = Object.keys(data[0]);
//   const csvRows = [
//     keys.join(","),
//     ...data.map((row) =>
//       keys.map((k) => `"${String(row[k]).replace(/"/g, '""')}"`).join(",")
//     ),
//   ];
//   const csvString = csvRows.join("\n");
//   const blob = new Blob([csvString], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// function formatNumber(num: number) {
//   return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
// }

// export default function ChartView({ data }: ChartViewProps) {
//   const [view, setView] = useState<"bar" | "table">("bar");
//   const [sortBy, setSortBy] = useState<"label" | "value">("label");
//   const [filter, setFilter] = useState("");
//   const chartRef = useRef<any>(null);
//   const [selectedData, setSelectedData] = useState<any | null>(null);

//   if (!data || data.length === 0) return <div>No data available</div>;

//   const keys = Object.keys(data[0]);
//   const labelKey = keys[0];
//   const valueKey =
//     keys.find((k) =>
//       data.some(
//         (d) =>
//           typeof d[k] === "number" &&
//           !isNaN(d[k]) &&
//           d[k] !== null &&
//           d[k] !== undefined
//       )
//     ) || keys[1];

//   // Filter data by label
//   const filteredData = data.filter((d) =>
//     String(d[labelKey]).toLowerCase().includes(filter.toLowerCase())
//   );

//   // Sort filtered data
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (sortBy === "label") {
//       return String(a[labelKey]).localeCompare(String(b[labelKey]));
//     } else {
//       return (b[valueKey] ?? 0) - (a[valueKey] ?? 0);
//     }
//   });

//   const labels = sortedData.map((d) => d[labelKey] ?? "Unknown");
//   const values = sortedData.map((d) =>
//     typeof d[valueKey] === "number" &&
//     !isNaN(d[valueKey]) &&
//     d[valueKey] !== null
//       ? d[valueKey]
//       : 0
//   );

//   // Bar chart data
//   const barChartData = {
//     labels,
//     datasets: [
//       {
//         label: valueKey,
//         data: values,
//         backgroundColor: "#5a8068",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top" as const,
//         labels: {
//           color: "#22543d",
//           font: { weight: "bold" as const },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context: any) =>
//             `${context.dataset.label}: ${
//               context.parsed.y?.toLocaleString() ?? context.parsed
//             } `,
//         },
//       },
//     },
//     onClick: (evt: any, elements: any[]) => {
//       if (elements.length === 0) return;
//       const chart = chartRef.current;
//       if (!chart) return;
//       const index = elements[0].index;
//       setSelectedData(sortedData[index] || null);
//     },
//   };

//   const downloadJPEG = () => {
//     if (chartRef.current) {
//       const base64Image = chartRef.current.toBase64Image("image/jpeg", 1);
//       const link = document.createElement("a");
//       link.href = base64Image;
//       link.download = `chart-${view}.jpeg`;
//       link.click();
//     }
//   };

//   // --- Button base and states ---
//   const buttonBaseClasses =
//     "flex items-center gap-2 px-5 py-2 rounded-md font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-600";

//   const activeButtonClasses =
//     "bg-green-700 border-green-800 text-white shadow-md shadow-green-700/50";

//   const inactiveButtonClasses =
//     "bg-white border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300";

//   // --- SVG Icons ---
//   const IconBar = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <rect x={3} y={10} width={4} height={11} rx={1} />
//       <rect x={10} y={6} width={4} height={15} rx={1} />
//       <rect x={17} y={3} width={4} height={18} rx={1} />
//     </svg>
//   );

//   const IconTable = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <rect x={3} y={4} width={18} height={16} rx={2} ry={2} />
//       <line x1={3} y1={10} x2={21} y2={10} />
//       <line x1={9} y1={4} x2={9} y2={20} />
//       <line x1={15} y1={4} x2={15} y2={20} />
//     </svg>
//   );

//   const IconDownload = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
//       <path d="M4 17h16" />
//     </svg>
//   );

//   const IconClipboard = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <rect x={9} y={2} width={6} height={4} rx={1} />
//       <path d="M5 8h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
//     </svg>
//   );

//   const IconPhoto = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
//       <circle cx={12} cy={14} r={3} />
//       <path d="M7 7h.01" />
//     </svg>
//   );

//   return (
//     <>
//       <div className="my-4 p-6 bg-white border border-gray-200 rounded-xl shadow-lg max-w-full">
//         {/* VIEW SWITCH */}
//         <div className="mb-6 flex gap-4 flex-wrap">
//           <button
//             className={`${buttonBaseClasses} ${
//               view === "bar" ? activeButtonClasses : inactiveButtonClasses
//             }`}
//             onClick={() => setView("bar")}
//             aria-label="Bar Chart"
//             type="button"
//           >
//             <IconBar />
//             Bar Chart
//           </button>

//           <button
//             className={`${buttonBaseClasses} ${
//               view === "table" ? activeButtonClasses : inactiveButtonClasses
//             }`}
//             onClick={() => setView("table")}
//             aria-label="Table View"
//             type="button"
//           >
//             <IconTable />
//             Table View
//           </button>

//           <button
//             className={`${buttonBaseClasses} ${inactiveButtonClasses}`}
//             onClick={() => downloadCSV(sortedData)}
//             title="Download CSV"
//             aria-label="Download CSV"
//             type="button"
//           >
//             <IconDownload />
//             Download CSV
//           </button>

//           <button
//             className={`${buttonBaseClasses} ${inactiveButtonClasses}`}
//             onClick={() => {
//               navigator.clipboard.writeText(
//                 JSON.stringify(sortedData, null, 2)
//               );
//               alert("Data copied to clipboard!");
//             }}
//             title="Copy data to clipboard"
//             aria-label="Copy Data"
//             type="button"
//           >
//             <IconClipboard />
//             Share Data
//           </button>

//           {view === "bar" && (
//             <button
//               className={`${buttonBaseClasses} ${inactiveButtonClasses}`}
//               onClick={() => {
//                 if (chartRef.current) {
//                   const base64Image = chartRef.current.toBase64Image(
//                     "image/jpeg",
//                     1
//                   );
//                   const link = document.createElement("a");
//                   link.href = base64Image;
//                   link.download = `chart-${view}.jpeg`;
//                   link.click();
//                 }
//               }}
//               title="Download Chart as JPEG"
//               aria-label="Download Chart as JPEG"
//               type="button"
//             >
//               <IconPhoto />
//               Download JPEG
//             </button>
//           )}
//         </div>

//         {/* SORT & FILTER CONTROLS */}
//         <div className="mb-6 flex flex-wrap items-center gap-4">
//           <div>
//             <label htmlFor="filterInput" className="mr-2 font-semibold">
//               Filter:
//             </label>
//             <input
//               id="filterInput"
//               type="text"
//               placeholder={`Filter by ${labelKey}`}
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="px-3 py-2 border rounded"
//             />
//           </div>

//           <div>
//             <label htmlFor="sortSelect" className="mr-2 font-semibold">
//               Sort by:
//             </label>
//             <select
//               id="sortSelect"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value as "label" | "value")}
//               className="px-3 py-2 border rounded"
//             >
//               <option value="label">Label (A-Z)</option>
//               <option value="value">Value (High to Low)</option>
//             </select>
//           </div>
//         </div>

//         {/* VIEWS */}
//         {view === "bar" && (
//           <Bar ref={chartRef} data={barChartData} options={options} />
//         )}

//         {view === "table" && (
//           <div className="overflow-auto max-h-96 border border-transparent rounded-md">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-green-100 text-green-900 font-semibold">
//                   {keys.map((key) => (
//                     <th key={key} className="px-4 py-2 text-left">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedData.map((row, i) => (
//                   <tr
//                     key={i}
//                     className={i % 2 === 0 ? "bg-white" : "bg-green-50"}
//                   >
//                     {keys.map((key) => (
//                       <td key={key} className="px-4 py-2">
//                         {typeof row[key] === "number"
//                           ? row[key].toLocaleString()
//                           : String(row[key])}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* MODAL for selected data */}
//       {selectedData && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           onClick={() => setSelectedData(null)}
//           aria-modal="true"
//           role="dialog"
//         >
//           <div
//             className="bg-white rounded-lg max-w-md w-full p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
//               onClick={() => setSelectedData(null)}
//               aria-label="Close popup"
//               type="button"
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-green-800">
//               Details: {selectedData[labelKey]}
//             </h3>

//             <dl className="grid grid-cols-1 gap-2">
//               {keys.map((key) => (
//                 <div key={key} className="flex justify-between border-b py-1">
//                   <dt className="font-semibold">{key}</dt>
//                   <dd className="text-right">
//                     {typeof selectedData[key] === "number"
//                       ? selectedData[key].toLocaleString()
//                       : String(selectedData[key])}
//                   </dd>
//                 </div>
//               ))}
//             </dl>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import jsPDF from "jspdf";
import {
  FileDown,
  ImageIcon,
  Camera,
  FileText,
  MoveDiagonal,
  ClipboardCopy,
  ChevronDown,
  BarChart3,
  LineChart,
  PieChart,
  Donut,
  RadarIcon,
  Target,
  TableIcon,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
  annotationPlugin,
  ChartDataLabels
);

type ChartType =
  | "bar"
  | "table"
  | "line"
  | "pie"
  | "doughnut"
  | "radar"
  | "polar";
type ColorTheme = "default" | "vibrant" | "pastel" | "monochrome" | "gradient";

type ChartViewProps = {
  data: any[];
};

const COLOR_THEMES = {
  default: ["#5a8068", "#4a6f58", "#6b9078", "#8ab098", "#a9d0b8"],
  vibrant: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
  pastel: ["#FFB6C1", "#87CEEB", "#98FB98", "#FFE4B5", "#DDA0DD"],
  monochrome: ["#1a1a1a", "#4a4a4a", "#7a7a7a", "#aaaaaa", "#dadada"],
  gradient: ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"],
};

function formatColumnName(columnName: string): string {
  const specialCases: Record<string, string> = {
    SUPPLIER_NAME: "Supplier Name",
    INVOICE_NUMBER: "Invoice Number",
    INVOICE_TOTAL: "Invoice Total",
    INVOICE_HEADER_TOTAL: "Invoice Header Total",
    Invoice_Header_Total: "Invoice Header Total",
    LINE_ITEMS_TOTAL: "Line Items Total",
    Line_Items_Total: "Line Items Total",
    TOTAL_LINE_AMOUNT_INC_GST: "Total Amount (Inc. GST)",
    TOTAL_LINE_AMOUNT_EXCL_GST: "Total Amount (Exc. GST)",
    PURCHASE_ORDER_NUMBER: "Purchase Order Number",
    INVOICE_DATE: "Invoice Date",
    PRODUCT_DESCRIPTION: "Product Description",
    UNIT_PRICE: "Unit Price",
    QTY_RECEIVED: "Quantity Received",
    LEAKAGE_AMOUNT: "Leakage Amount",
    CONTRACT_NUMBER: "Contract Number",
    CONTRACT_STATUS: "Contract Status",
    LHN: "Department",
    GST: "GST",
    DISCREPANCY: "Discrepancy",
    Discrepancy: "Discrepancy",
  };

  if (specialCases[columnName]) {
    return specialCases[columnName];
  }

  return columnName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/Id\b/g, "ID")
    .replace(/Gst\b/gi, "GST")
    .replace(/Lhn\b/gi, "Department")
    .replace(/Inc\b/gi, "Inc.")
    .replace(/Excl\b/gi, "Exc.");
}

function formatDisplayValue(value: any, columnName: string): string {
  if (value === null || value === undefined) return "N/A";

  const lowerColumn = columnName.toLowerCase();

  if (
    lowerColumn.includes("amount") ||
    lowerColumn.includes("total") ||
    lowerColumn.includes("price") ||
    lowerColumn.includes("gst") ||
    lowerColumn.includes("leakage") ||
    lowerColumn.includes("spend") ||
    lowerColumn.includes("discrepancy")
  ) {
    const numValue = Number.parseFloat(value);
    if (!isNaN(numValue)) {
      return `$${numValue.toLocaleString("en-AU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-AU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return String(value);
}

function calculateStats(values: number[]) {
  const validValues = values.filter((v) => typeof v === "number" && !isNaN(v));
  if (validValues.length === 0) return null;

  const sum = validValues.reduce((a, b) => a + b, 0);
  const mean = sum / validValues.length;
  const sorted = [...validValues].sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
  const min = Math.min(...validValues);
  const max = Math.max(...validValues);
  const range = max - min;
  const variance =
    validValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    validValues.length;
  const stdDev = Math.sqrt(variance);

  return {
    sum,
    mean,
    median,
    min,
    max,
    range,
    stdDev,
    count: validValues.length,
  };
}

function downloadCSV(data: any[], filename = "data.csv") {
  if (!data || data.length === 0) return;
  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.map(formatColumnName).join(","),
    ...data.map((row) =>
      keys.map((k) => `"${String(row[k]).replace(/"/g, '""')}"`).join(",")
    ),
  ];
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function DropdownMenu({
  trigger,
  children,
  align = "left",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 min-w-[200px] py-2 ${
              align === "right" ? "right-0" : "left-0"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

const ChartView: React.FC<ChartViewProps> = ({ data }) => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [sortBy, setSortBy] = useState<"label" | "value">("label");
  const [filter, setFilter] = useState("");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default");
  const [showDataLabels, setShowDataLabels] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showTrendline, setShowTrendline] = useState(true);
  const [showAverage, setShowAverage] = useState(true);
  const chartRef = useRef<any>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  if (!data || data.length === 0) {
    return <div className="text-gray-500 p-4">No data available</div>;
  }

  const keys = Object.keys(data[0]);
  const labelKey = keys[0];
  const valueKey =
    keys.find((k) =>
      data.some(
        (d) => typeof d[k] === "number" && !isNaN(d[k]) && d[k] !== null
      )
    ) || keys[1];

  // Filter and sort
  const filteredData = data.filter((d) =>
    String(d[labelKey]).toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "label") {
      return String(a[labelKey]).localeCompare(String(b[labelKey]));
    } else {
      return (b[valueKey] ?? 0) - (a[valueKey] ?? 0);
    }
  });

  const labels = sortedData.map((d) => {
    const rawLabel = d[labelKey] ?? "Unknown";
    if (typeof rawLabel === "string" && rawLabel.includes("_")) {
      return formatColumnName(rawLabel);
    }
    return rawLabel;
  });

  const values = sortedData.map((d) =>
    typeof d[valueKey] === "number" &&
    !isNaN(d[valueKey]) &&
    d[valueKey] !== null
      ? d[valueKey]
      : 0
  );

  const stats = calculateStats(values);

  // Color palette
  const colors = COLOR_THEMES[colorTheme];
  const backgroundColors = values.map((_, i) => colors[i % colors.length]);
  const borderColors = backgroundColors.map((c) => c);

  // Calculate trendline
  const trendlineData =
    showTrendline && chartType === "line" && values.length > 0
      ? values.map((_, i) => {
          const n = values.length;
          const sumX = values.reduce((acc, _, j) => acc + j, 0);
          const sumY = values.reduce((acc, val) => acc + val, 0);
          const sumXY = values.reduce((acc, val, j) => acc + j * val, 0);
          const sumXX = values.reduce((acc, _, j) => acc + j * j, 0);

          const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;

          return slope * i + intercept;
        })
      : [];

  const formattedValueKey = formatColumnName(valueKey);

  const chartData = {
    labels,
    datasets: [
      {
        label: formattedValueKey,
        data: values,
        backgroundColor:
          chartType === "pie" ||
          chartType === "doughnut" ||
          chartType === "polar"
            ? backgroundColors
            : backgroundColors[0],
        borderColor: chartType === "line" ? borderColors[0] : borderColors,
        borderWidth: 2,
        fill: chartType === "line",
        tension: 0.4,
        pointRadius: chartType === "line" ? 4 : 0,
        pointHoverRadius: chartType === "line" ? 6 : 0,
      },
      ...(showTrendline && chartType === "line" && trendlineData.length > 0
        ? [
            {
              label: "Trend",
              data: trendlineData,
              borderColor: "rgba(255, 99, 132, 0.6)",
              backgroundColor: "transparent",
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 0,
              fill: false,
              tension: 0,
            },
          ]
        : []),
    ],
  };

  const isCurrencyField =
    valueKey.toLowerCase().includes("amount") ||
    valueKey.toLowerCase().includes("total") ||
    valueKey.toLowerCase().includes("price") ||
    valueKey.toLowerCase().includes("gst") ||
    valueKey.toLowerCase().includes("leakage") ||
    valueKey.toLowerCase().includes("spend") ||
    valueKey.toLowerCase().includes("discrepancy");

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#2d4f3e",
          font: { weight: "bold", size: 12 },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: `${formattedValueKey} Analysis`,
        color: "#2d4f3e",
        font: { size: 18, weight: "bold" },
        padding: 20,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(45, 79, 62, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y ?? context.parsed;
            const formattedValue =
              isCurrencyField && typeof value === "number"
                ? `$${value.toLocaleString("en-AU", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : typeof value === "number"
                ? value.toLocaleString()
                : value;
            return `${context.dataset.label}: ${formattedValue}`;
          },
          afterLabel: (context: any) => {
            if (stats && context.datasetIndex === 0) {
              const value = context.parsed.y ?? context.parsed;
              const percentage = ((value / stats.sum) * 100).toFixed(1);
              return `${percentage}% of total`;
            }
            return "";
          },
        },
      },
      datalabels: {
        display:
          showDataLabels &&
          (chartType === "pie" ||
            chartType === "doughnut" ||
            chartType === "polar"),
        color: "#fff",
        font: { weight: "bold", size: 11 },
        formatter: (value: any, context: any) => {
          if (stats) {
            const percentage = ((value / stats.sum) * 100).toFixed(0);
            return `${percentage}%`;
          }
          return value.toLocaleString();
        },
      },
      zoom:
        chartType === "bar" || chartType === "line"
          ? {
              zoom: {
                wheel: { enabled: true, speed: 0.1 },
                pinch: { enabled: true },
                mode: "x",
              },
              pan: {
                enabled: true,
                mode: "x",
                modifierKey: "shift",
              },
            }
          : undefined,
      annotation:
        showAverage && stats && (chartType === "bar" || chartType === "line")
          ? {
              annotations: {
                averageLine: {
                  type: "line",
                  yMin: stats.mean,
                  yMax: stats.mean,
                  borderColor: "rgba(255, 159, 64, 0.8)",
                  borderWidth: 2,
                  borderDash: [10, 5],
                  label: {
                    display: true,
                    content: isCurrencyField
                      ? `Average: $${stats.mean.toLocaleString("en-AU", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`
                      : `Average: ${stats.mean.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`,
                    position: "end",
                    backgroundColor: "rgba(255, 159, 64, 0.9)",
                    color: "#fff",
                    font: { weight: "bold", size: 11 },
                    padding: 6,
                    borderRadius: 4,
                  },
                },
              },
            }
          : undefined,
    },
    scales:
      chartType === "bar" || chartType === "line"
        ? {
            y: {
              beginAtZero: true,
              grid: { color: "rgba(0, 0, 0, 0.05)" },
              ticks: {
                color: "#4a5d50",
                font: { size: 11 },
                callback: (value: any) => {
                  return isCurrencyField
                    ? `$${value.toLocaleString()}`
                    : value.toLocaleString();
                },
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "#4a5d50",
                font: { size: 11 },
                maxRotation: 45,
                minRotation: 0,
              },
            },
          }
        : chartType === "radar"
        ? {
            r: {
              beginAtZero: true,
              ticks: { color: "#4a5d50", backdropColor: "transparent" },
              grid: { color: "rgba(0, 0, 0, 0.1)" },
              pointLabels: {
                color: "#2d4f3e",
                font: { size: 11, weight: "bold" },
              },
            },
          }
        : undefined,
    onClick: (evt: any, elements: any[]) => {
      if (elements.length === 0) return;
      const index = elements[0].index;
      setSelectedData(sortedData[index] || null);
    },
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
   const zoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.2)
    }
  };

  const zoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.8)
    }
  };

  const downloadImage = (format: "png" | "jpeg") => {
    if (chartRef.current) {
      const base64Image = chartRef.current.toBase64Image(`image/${format}`, 1);
      const link = document.createElement("a");
      link.href = base64Image;
      link.download = `chart-${chartType}.${format}`;
      link.click();
    }
  };

  const downloadPDF = () => {
    if (chartRef.current) {
      const base64Image = chartRef.current.toBase64Image("image/png", 1);
      const pdf = new jsPDF("landscape");
      const imgWidth = 280;
      const imgHeight = 180;
      pdf.text(`${formattedValueKey} Analysis Report`, 15, 15);
      pdf.addImage(base64Image, "PNG", 10, 25, imgWidth, imgHeight);

      if (stats) {
        let yPos = 210;
        pdf.setFontSize(10);
        pdf.text(`Statistics:`, 15, yPos);
        yPos += 7;
        const formatPdfValue = (val: number) => {
          return isCurrencyField
            ? `$${val.toLocaleString("en-AU", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : val.toLocaleString(undefined, { maximumFractionDigits: 2 });
        };
        pdf.text(`Total: ${formatPdfValue(stats.sum)}`, 15, yPos);
        yPos += 5;
        pdf.text(`Average: ${formatPdfValue(stats.mean)}`, 15, yPos);
        yPos += 5;
        pdf.text(`Median: ${formatPdfValue(stats.median)}`, 15, yPos);
        yPos += 5;
        pdf.text(
          `Min: ${formatPdfValue(stats.min)} | Max: ${formatPdfValue(
            stats.max
          )}`,
          15,
          yPos
        );
      }

      pdf.save(`chart-${chartType}-report.pdf`);
    }
  };

  const renderChart = () => {
    const commonProps = { ref: chartRef, data: chartData, options };

    switch (chartType) {
      case "bar":
        return <Bar {...commonProps} />;
      case "line":
        return <Line {...commonProps} />;
      case "pie":
        return <Pie {...commonProps} />;
      case "doughnut":
        return <Doughnut {...commonProps} />;
      case "radar":
        return <Radar {...commonProps} />;
      case "polar":
        return <PolarArea {...commonProps} />;
      default:
        return <Bar {...commonProps} />;
    }
  };

  const chartTypeIcons: Record<ChartType, any> = {
    bar: BarChart3,
    table: TableIcon,
    line: LineChart,
    pie: PieChart,
    doughnut: Donut,
    radar: RadarIcon,
    polar: Target,
  };

  const chartTypeLabels: Record<ChartType, string> = {
    bar: "Bar Chart",
    table: "Data Table",
    line: "Line Chart",
    pie: "Pie Chart",
    doughnut: "Doughnut Chart",
    radar: "Radar Chart",
    polar: "Polar Chart",
  };

  const ChartTypeIcon = chartTypeIcons[chartType];

  return (
    <>
      <div className="my-6 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
        {/* CONTROLS */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Chart Type Dropdown */}
            <DropdownMenu
              trigger={
                <button
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#5a8068] text-white rounded-lg font-semibold hover:bg-[#4a6f58] transition-all shadow-md"
                  type="button"
                >
                  <ChartTypeIcon size={18} />
                  <span>{chartTypeLabels[chartType]}</span>
                  <ChevronDown size={16} />
                </button>
              }
            >
              {(
                [
                  "bar",
                  "table",
                  "line",
                  "pie",
                  "doughnut",
                  "radar",
                  "polar",
                ] as ChartType[]
              ).map((type) => {
                const Icon = chartTypeIcons[type];
                return (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors ${
                      chartType === type ? "bg-gray-100 font-semibold" : ""
                    }`}
                    type="button"
                  >
                    <Icon size={18} />
                    <span>{chartTypeLabels[type]}</span>
                  </button>
                );
              })}
            </DropdownMenu>

            {/* Theme Dropdown */}
            <DropdownMenu
              trigger={
                <button
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  type="button"
                >
                  <div className="flex gap-1">
                    {COLOR_THEMES[colorTheme].slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="capitalize">{colorTheme} Theme</span>
                  <ChevronDown size={16} />
                </button>
              }
            >
              {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setColorTheme(theme)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors ${
                    colorTheme === theme ? "bg-gray-100 font-semibold" : ""
                  }`}
                  type="button"
                >
                  <div className="flex gap-1">
                    {COLOR_THEMES[theme].slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="capitalize">{theme}</span>
                </button>
              ))}
            </DropdownMenu>

            {/* Export Dropdown */}
            <DropdownMenu
              trigger={
                <button
                  className="flex items-center bg-gray-100 gap-2 px-4 py-2.5 text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  type="button"
                >
                  <Download size={18} />
                  <span>Export</span>
                  <ChevronDown size={16} />
                </button>
              }
            >
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Data
                </div>
                <button
                  onClick={() => downloadCSV(sortedData)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  <FileDown size={18} />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(sortedData, null, 2)
                    );
                    alert("Data copied to clipboard!");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  <ClipboardCopy size={18} />
                  <span>Copy to Clipboard</span>
                </button>

                {chartType !== "table" && (
                  <>
                    <div className="my-2 border-t border-gray-200" />
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Chart
                    </div>
                    <button
                      onClick={() => downloadImage("png")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <ImageIcon size={18} />
                      <span>Export as PNG</span>
                    </button>
                    <button
                      onClick={() => downloadImage("jpeg")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <Camera size={18} />
                      <span>Export as JPEG</span>
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <FileText size={18} />
                      <span>Export as PDF</span>
                    </button>

                    {(chartType === "bar" || chartType === "line") && (
                      <>
                        <div className="my-2 border-t border-gray-200" />
                        <button
                          onClick={resetZoom}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
                          type="button"
                        >
                          <MoveDiagonal size={18} />
                          <span>Reset Zoom</span>
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </DropdownMenu>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            {[
              {
                label: "Data Labels",
                checked: showDataLabels,
                onChange: (val: boolean) => setShowDataLabels(val),
              },
              {
                label: "Statistics",
                checked: showStats,
                onChange: (val: boolean) => setShowStats(val),
              },
              ...(chartType === "bar" || chartType === "line"
                ? [
                    {
                      label: "Average Line",
                      checked: showAverage,
                      onChange: (val: boolean) => setShowAverage(val),
                    },
                  ]
                : []),
              ...(chartType === "line"
                ? [
                    {
                      label: "Trendline",
                      checked: showTrendline,
                      onChange: (val: boolean) => setShowTrendline(val),
                    },
                  ]
                : []),
            ].map(({ label, checked, onChange }) => (
              <label
                key={label}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => onChange(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                    checked ? "bg-[#5a8068]" : "bg-gray-300"
                  } group-hover:opacity-90`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      checked ? "translate-x-5" : ""
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </label>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="filterInput"
                className="text-sm font-semibold text-gray-700"
              >
                Filter:
              </label>
              <input
                id="filterInput"
                type="text"
                placeholder={`Search ${formatColumnName(labelKey)}...`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sortSelect"
                className="text-sm font-semibold text-gray-700"
              >
                Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "label" | "value")}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
              >
                <option value="label">Value (High to Low)</option>
                <option value="value">Label (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* STATISTICS PANEL */}
        {showStats && stats && chartType !== "table" && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Total
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                {isCurrencyField ? "$" : ""}
                {stats.sum.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Average
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                {isCurrencyField ? "$" : ""}
                {stats.mean.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Records
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                {stats.count.toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Range
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                {isCurrencyField ? "$" : ""}
                {stats.min.toLocaleString()} - {isCurrencyField ? "$" : ""}
                {stats.max.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* CHART OR TABLE */}
        {chartType === "table" ? (
          <div className="overflow-auto max-h-[600px] border border-gray-200 rounded-lg w-full">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-[#5a8068] text-white">
                <tr>
                  {keys.map((key) => (
                    <th
                      key={key}
                      className="px-4 py-3 text-left font-semibold text-sm whitespace-nowrap"
                    >
                      {formatColumnName(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-colors cursor-pointer`}
                    onClick={() => setSelectedData(row)}
                  >
                    {keys.map((key) => (
                      <td
                        key={key}
                        className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                      >
                        {formatDisplayValue(row[key], key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
           <>
            {/* Manual Zoom Controls */}
            {(chartType === "bar" || chartType === "line") && (
              <div className="flex justify-center items-center gap-3 mb-4">
                <button
                  onClick={zoomOut}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  type="button"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={18} />
                  <span>Zoom Out</span>
                </button>
                <button
                  onClick={resetZoom}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  type="button"
                  aria-label="Reset Zoom"
                >
                  <MoveDiagonal size={18} />
                  <span>Reset</span>
                </button>
                <button
                  onClick={zoomIn}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  type="button"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={18} />
                  <span>Zoom In</span>
                </button>
              </div>
            )}
            <div className="relative" style={{ height: "600px" }}>
              {renderChart()}
            </div>
          </>
        )}


        {/* ZOOM HINT */}
        {(chartType === "bar" || chartType === "line") && (
          <div className="mt-4 text-center text-sm font-semibold italic text-gray-600">
            💡 Scroll to zoom • Shift + Drag to pan • Click data points for
            details
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedData(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-2xl leading-none"
              onClick={() => setSelectedData(null)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#5a8068]">
              {selectedData[labelKey]}
            </h3>

            <div className="space-y-3">
              {keys.map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <span className="font-semibold text-gray-700">
                    {formatColumnName(key)}:
                  </span>
                  <span className="text-gray-900 font-mono">
                    {formatDisplayValue(selectedData[key], key)}
                  </span>
                </div>
              ))}
            </div>

            {stats && typeof selectedData[valueKey] === "number" && (
              <div className="mt-6 pt-4 border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Insights:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>% of Total:</span>
                    <span className="font-semibold">
                      {((selectedData[valueKey] / stats.sum) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>vs Average:</span>
                    <span
                      className={`font-semibold ${
                        selectedData[valueKey] > stats.mean
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedData[valueKey] > stats.mean ? "+" : ""}
                      {(
                        ((selectedData[valueKey] - stats.mean) / stats.mean) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChartView;
