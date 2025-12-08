interface SummaryCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
}

export default function SummaryCard({ label, value, subValue }: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between min-w-[200px]">
      <div>
        <p className="text-[14px] text-[#0D141C] mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-[16px] font-bold text-[#0D141C]">{value}</h3>
          {subValue && <span className="text-xs text-gray-500 font-medium">({subValue})</span>}
        </div>
      </div>
      <div className="text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}