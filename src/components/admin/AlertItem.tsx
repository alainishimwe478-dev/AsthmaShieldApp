import React from "react";

interface AlertItemProps {
  type: 'high-risk' | 'warning' | 'info';
  message: string;
  district: string;
}

export default function AlertItem({ type, message, district }: AlertItemProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'high-risk': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#64748B';
    }
  };

  return (
    <div 
      className="0i6zt14q 0alert-item p-4 rounded-xl border-l-4 mb-3"
      style={{ 
        backgroundColor: 'white', 
        borderLeftColor: getTypeColor() 
      }}
    >
      <div className="0ct4pa5a 0alert-header flex justify-between items-center mb-2">
        <span 
          className="0cg0bkjp 0alert-type text-xs font-bold uppercase tracking-wider"
          style={{ color: getTypeColor() }}
        >
          {type.replace('-', ' ')}
        </span>
        <span className="06b7fy27 0alert-district text-xs text-gray-500">{district}</span>
      </div>
      <p className="0lhoz171 0alert-message text-sm text-gray-700">{message}</p>
    </div>
  );
}
