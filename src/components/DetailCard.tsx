import type { ReactNode } from 'react';

interface DetailCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export default function DetailCard({ icon, label, value }: DetailCardProps) {
  return (
    <li className="detail-card">
      <span className="detail-card-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="detail-card-text">
        <span className="detail-label">{label}</span>
        <span className="detail-value">{value}</span>
      </div>
    </li>
  );
}
