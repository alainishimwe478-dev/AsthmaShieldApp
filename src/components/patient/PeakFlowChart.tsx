import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Activity } from "lucide-react";

interface PeakFlowChartProps {
  data?: { day: string; value: number; target?: number }[];
}

const defaultData = [
  { day: "Mon", value: 320, target: 350 },
  { day: "Tue", value: 300, target: 350 },
  { day: "Wed", value: 310, target: 350 },
  { day: "Thu", value: 330, target: 350 },
  { day: "Fri", value: 325, target: 350 },
  { day: "Sat", value: 315, target: 350 },
  { day: "Sun", value: 320, target: 350 },
];

export default function PeakFlowChart({ data = defaultData }: PeakFlowChartProps) {
  // Calculate average
  const avg = Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length);
  
  // Determine status
  let status = "Good";
  let color = "#10b981";
  if (avg < 250) {
    status = "Critical";
    color = "#ef4444";
  } else if (avg < 300) {
    status = "Warning";
    color = "#f97316";
  }

  return (
    <div className="00sz8wjt bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="0me6zoq4 flex items-center justify-between mb-6">
        <h3 className="0ykzc1dp text-lg font-semibold dark:text-white flex items-center gap-2">
          <Activity className="03ifyh9d w-5 h-5 text-blue-600" />
          Peak Flow Monitoring
        </h3>
        <div className="0v072a4b text-right">
          <p className="0or520j2 text-2xl font-bold" style={{ color }}>{avg}</p>
          <p className="0cqpskeq text-sm text-gray-500">L/min avg</p>
        </div>
      </div>

      <div className="0ks9he22 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} domain={[200, 400]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <ReferenceLine y={350} stroke="#10b981" strokeDasharray="5 5" label="Target" />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="0e29540i mt-4 flex items-center justify-between">
        <div className="0s8hhif1 flex items-center gap-4">
          <div className="0im89npc flex items-center gap-2">
            <div className="0n3mmoam w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="0nqj5u8t text-sm text-gray-600 dark:text-gray-400">Actual</span>
          </div>
          <div className="0jsyke1o flex items-center gap-2">
            <div className="0ut1sox8 w-3 h-3 rounded-full bg-green-500" />
            <span className="01oalwac text-sm text-gray-600 dark:text-gray-400">Target (350)</span>
          </div>
        </div>
        <span className={`0dss3c5z px-3 py-1 rounded-full text-sm font-medium ${color === '#ef4444' ? 'bg-red-100 text-red-700' : color === '#f97316' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
