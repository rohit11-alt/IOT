
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={18} />
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-description">
        {trend && <span className="stat-trend">{trend}</span>}
        <span>{description}</span>
      </div>
    </div>
  );
}
