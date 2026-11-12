
import {
  Users,
  ShieldAlert,
  Camera,
  ShieldCheck,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../components/dashboard/StatCard";

const activityData = [
  { time: "06 AM", visitors: 2 },
  { time: "08 AM", visitors: 5 },
  { time: "10 AM", visitors: 8 },
  { time: "12 PM", visitors: 4 },
  { time: "02 PM", visitors: 11 },
  { time: "04 PM", visitors: 7 },
  { time: "06 PM", visitors: 13 },
  { time: "08 PM", visitors: 6 },
  { time: "10 PM", visitors: 3 },
];

const events = [
  {
    name: "Visitor detected",
    detail: "Entrance zone · 10:42 AM",
    duration: "3 sec",
    status: "Normal",
    type: "normal",
  },
  {
    name: "Prolonged presence",
    detail: "Entrance zone · 10:18 AM",
    duration: "12 sec",
    status: "Unusual",
    type: "unusual",
  },
  {
    name: "Visitor detected",
    detail: "Entrance zone · 09:56 AM",
    duration: "4 sec",
    status: "Normal",
    type: "normal",
  },
  {
    name: "Repeated approach",
    detail: "Entrance zone · 09:32 AM",
    duration: "15 sec",
    status: "Unusual",
    type: "unusual",
  },
];

export default function Overview() {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Security Overview</h1>
          <p>Monitor your entrance and review recent security activity.</p>
        </div>

        <div className="page-heading-actions">
          <span className="last-updated">Updated just now</span>
          <button className="outline-button">
            <MoreHorizontal size={17} />
            More
          </button>
        </div>
      </div>

      <div className="security-banner">
        <div className="security-banner-icon">
          <ShieldCheck size={21} />
        </div>
        <div className="security-banner-text">
          <strong>Security system is armed</strong>
          <span>Your entrance is being monitored.</span>
        </div>
        <span className="armed-label">ARMED</span>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Visitors"
          value="128"
          description="Compared to previous period"
          trend="+12.5%"
          icon={Users}
        />
        <StatCard
          title="Unusual Activities"
          value="08"
          description="Requires your attention"
          trend="2 pending"
          icon={ShieldAlert}
        />
        <StatCard
          title="Normal Visits"
          value="120"
          description="Successfully recorded"
          trend="93.7%"
          icon={ShieldCheck}
        />
        <StatCard
          title="Camera Status"
          value="Online"
          description="Entrance camera connected"
          icon={Camera}
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h3>Visitor Activity</h3>
              <p>Visitor detections throughout the day</p>
            </div>
            <button className="outline-button small-button">
              Today
            </button>
          </div>

          <div className="chart-summary">
            <strong>128</strong>
            <span>visitors detected</span>
            <span className="chart-change">
              <ArrowUpRight size={14} /> 12.5%
            </span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#171717" stopOpacity={0.13} />
                    <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#eeeeee" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="time"
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
                  fill="url(#visitorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel sensor-panel">
          <div className="panel-heading">
            <div>
              <h3>Hardware Status</h3>
              <p>Connected security devices</p>
            </div>
            <span className="online-label">All systems online</span>
          </div>

          <div className="sensor-list">
            {[
              ["Entrance Camera", "Connected", "camera"],
              ["Arduino Controller", "Connected", "controller"],
              ["Ultrasonic Sensor 1", "Active", "sensor"],
              ["Ultrasonic Sensor 2", "Active", "sensor"],
              ["IR Sensor 1", "Active", "sensor"],
              ["IR Sensor 2", "Active", "sensor"],
            ].map(([name, status]) => (
              <div className="sensor-row" key={name}>
                <div className="sensor-indicator">
                  <span className="status-dot" />
                  <span>{name}</span>
                </div>
                <span className="sensor-status">{status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel events-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Security Events</h3>
            <p>A summary of the latest visitor activity</p>
          </div>
          <button className="text-button">View all events <ArrowUpRight size={15} /></button>
        </div>

        <div className="table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>LOCATION & TIME</th>
                <th>DURATION</th>
                <th>CLASSIFICATION</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <strong>{event.name}</strong>
                  </td>
                  <td className="secondary-cell">{event.detail}</td>
                  <td>{event.duration}</td>
                  <td>
                    <span className={`event-badge ${event.type}`}>
                      <span className="badge-dot" />
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <button className="table-more">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="demo-disclaimer">
        Demo data is displayed. Live device readings will appear after backend integration.
      </p>
    </div>
  );
}
