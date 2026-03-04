import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="0urz5fkn p-6 bg-white rounded-3xl border shadow-sm hover:shadow-md transition">
      <div className="06pin1i8 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <p className="0fh3597l text-sm text-slate-500 font-medium">{label}</p>
      <p className="0vbsrbuv text-2xl font-black text-slate-800">{value}</p>
    </div>
  );
}
