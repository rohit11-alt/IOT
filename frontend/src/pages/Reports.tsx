
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Printer,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const visitorData = [
  { day: "Mon", visitors: 14, unusual: 2 },
  { day: "Tue", visitors: 18, unusual: 1 },
  { day: "Wed", visitors: 12, unusual: 2 },
  { day: "Thu", visitors: 21, unusual: 1 },
  { day: "Fri", visitors: 16, unusual: 0 },
  { day: "Sat", visitors: 25, unusual: 1 },
  { day: "Sun", visitors: 22, unusual: 1 },
];

const hourlyData = [
  { hour: "6 AM", visits: 3 },
  { hour: "8 AM", visits: 8 },
  { hour: "10 AM", visits: 15 },
  { hour: "12 PM", visits: 11 },
  { hour: "2 PM", visits: 19 },
  { hour: "4 PM", visits: 14 },
  { hour: "6 PM", visits: 22 },
  { hour: "8 PM", visits: 18 },
  { hour: "10 PM", visits: 8 },
];

const classificationData = [
  { name: "Normal", value: 120, color: "#16a36a" },
  { name: "Unusual", value: 8, color: "#d99442" },
];

const decisionData = [
  { name: "Approved", value: 5, color: "#16a36a" },
  { name: "Rejected", value: 2, color: "#d9534f" },
  { name: "Pending", value: 1, color: "#d99442" },
];

const reportRows = [
  { date: "12 Nov 2026", visitors: 22, normal: 20, unusual: 2 },
  { date: "11 Nov 2026", visitors: 25, normal: 24, unusual: 1 },
  { date: "10 Nov 2026", visitors: 16, normal: 15, unusual: 1 },
  { date: "09 Nov 2026", visitors: 21, normal: 19, unusual: 2 },
  { date: "08 Nov 2026", visitors: 12, normal: 10, unusual: 2 },
];

function downloadCSV(rows: typeof reportRows) {
  const headers = ["Date", "Total Visitors", "Normal Visits", "Unusual Events"];

  const csvRows = rows.map((row) =>
    [row.date, row.visitors, row.normal, row.unusual].join(",")
  );

  const csvContent = [headers.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "sentinelai-security-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function ReportStat({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="stat-card report-stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={17} />
        </div>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-description">{description}</div>
    </div>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState("7days");
  const [classification, setClassification] = useState("all");

  const filteredRows = useMemo(() => {
    if (classification === "normal") {
      return reportRows.map((row) => ({
        ...row,
        visitors: row.normal,
        unusual: 0,
      }));
    }

    if (classification === "unusual") {
      return reportRows.map((row) => ({
        ...row,
        visitors: row.unusual,
        normal: 0,
      }));
    }

    return reportRows;
  }, [classification]);

  const periodLabel =
    period === "today"
      ? "Today"
      : period === "30days"
        ? "Last 30 days"
        : "Last 7 days";

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Security Reports</h1>
          <p>
            Analyse visitor activity, unusual events and security performance.
          </p>
        </div>

        <div className="page-heading-actions report-actions">
          <select
            className="report-period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Select report period"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>

          <button
            className="outline-button"
            onClick={() => downloadCSV(filteredRows)}
          >
            <Download size={15} />
            Export CSV
          </button>

          <button
            className="outline-button"
            onClick={() => window.print()}
          >
            <Printer size={15} />
            Print
          </button>
        </div>
      </div>

      <div className="report-demo-notice">
        <FileText size={16} />
        <span>
          Demonstration report · Sample data, not actual security records.
        </span>
      </div>

      <div className="stats-grid">
        <ReportStat
          title="Total Visitors"
          value="128"
          description={`${periodLabel} · All recorded visits`}
          icon={Users}
        />

        <ReportStat
          title="Unusual Events"
          value="08"
          description="Activity flagged for review"
          icon={AlertTriangle}
        />

        <ReportStat
          title="Normal Visits"
          value="120"
          description="93.7% of recorded visits"
          icon={ShieldCheck}
        />

        <ReportStat
          title="Average Duration"
          value="6.4s"
          description="Average visit duration"
          icon={Activity}
        />
      </div>

      <div className="dashboard-grid report-main-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Visitor Activity Trend</h3>
              <p>Daily visitor detections · {periodLabel}</p>
            </div>
            <CalendarDays size={18} color="#888888" />
          </div>

          <div className="chart-container report-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient
                    id="reportVisitorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#171717" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#eeeeee"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 11 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 11 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#171717"
                  strokeWidth={2}
                  fill="url(#reportVisitorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Visit Classification</h3>
              <p>Normal and unusual activity</p>
            </div>
          </div>

          <div className="report-donut">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classificationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {classificationData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="report-donut-center">
              <strong>128</strong>
              <span>Total visits</span>
            </div>
          </div>

          <div className="report-legend">
            {classificationData.map((item) => (
              <div key={item.name}>
                <span>
                  <i style={{ background: item.color }} />
                  {item.name}
                </span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid report-secondary-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Hourly Visitor Distribution</h3>
              <p>Visitor activity by time of day</p>
            </div>
          </div>

          <div className="chart-container report-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid
                  stroke="#eeeeee"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 10 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="visits"
                  fill="#171717"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Owner Decisions</h3>
              <p>Breakdown of unusual event decisions</p>
            </div>
          </div>

          <div className="report-decision-list">
            {decisionData.map((item) => (
              <div className="report-decision-row" key={item.name}>
                <div>
                  <span
                    className="report-decision-dot"
                    style={{ background: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="report-decision-note">
            <CheckCircle2 size={15} />
            <span>8 unusual events recorded in this demo dataset.</span>
          </div>
        </section>
      </div>

      <section className="panel history-panel report-table-panel">
        <div className="panel-heading">
          <div>
            <h3>Daily Activity Summary</h3>
            <p>Visitor and event records by date</p>
          </div>

          <select
            className="report-period-select"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            aria-label="Filter report classification"
          >
            <option value="all">All activity</option>
            <option value="normal">Normal visits</option>
            <option value="unusual">Unusual events</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TOTAL VISITORS</th>
                <th>NORMAL VISITS</th>
                <th>UNUSUAL EVENTS</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.date}>
                  <td><strong>{row.date}</strong></td>
                  <td>{row.visitors}</td>
                  <td>{row.normal}</td>
                  <td>{row.unusual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="demo-disclaimer">
        All statistics, charts and records on this page are illustrative demo
        data. Date filters currently change the selected label only. Actual
        reports will be calculated from SentinelAI's database after integration.
      </p>
    </div>
  );
}
