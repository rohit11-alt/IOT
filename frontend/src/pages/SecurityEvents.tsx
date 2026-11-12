
import { useMemo, useState } from "react";
import {
  Search,
  ShieldAlert,
  Clock,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Eye,
  X,
} from "lucide-react";

type SecurityEvent = {
  id: string;
  title: string;
  reason: string;
  date: string;
  time: string;
  duration: string;
  status: "Pending" | "Approved" | "Rejected";
  evidence: string;
};

const sampleEvents: SecurityEvent[] = [
  {
    id: "EVT-001",
    title: "Prolonged presence",
    reason: "Person remained in the entrance zone beyond the configured threshold.",
    date: "Nov 12, 2026",
    time: "10:18 AM",
    duration: "12 sec",
    status: "Pending",
    evidence: "Snapshot and video available",
  },
  {
    id: "EVT-002",
    title: "Repeated approach",
    reason: "Multiple approach and leave movements detected.",
    date: "Nov 12, 2026",
    time: "09:32 AM",
    duration: "15 sec",
    status: "Rejected",
    evidence: "Snapshot and video available",
  },
  {
    id: "EVT-003",
    title: "Prolonged presence",
    reason: "Person stayed in the monitored zone longer than expected.",
    date: "Nov 11, 2026",
    time: "04:10 PM",
    duration: "11 sec",
    status: "Approved",
    evidence: "Snapshot and video available",
  },
  {
    id: "EVT-004",
    title: "Repeated approach",
    reason: "Repeated entrance-zone movement triggered an activity rule.",
    date: "Nov 10, 2026",
    time: "07:20 PM",
    duration: "18 sec",
    status: "Pending",
    evidence: "Snapshot available",
  },
];

export default function SecurityEvents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [events, setEvents] = useState(sampleEvents);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        `${event.id} ${event.title} ${event.reason}`.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || event.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [events, search, filter]);

  const updateStatus = (id: string, status: SecurityEvent["status"]) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );

    setSelectedEvent(null);
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Security Events</h1>
          <p>Investigate unusual activity and review owner decisions.</p>
        </div>
        <span className="event-summary-badge">
          <AlertTriangle size={14} />
          {events.filter((event) => event.status === "Pending").length} pending reviews
        </span>
      </div>

      <div className="event-summary-grid">
        <div className="panel event-summary-card">
          <span>Total events</span>
          <strong>{events.length.toString().padStart(2, "0")}</strong>
          <ShieldAlert size={19} />
        </div>
        <div className="panel event-summary-card">
          <span>Pending review</span>
          <strong>{events.filter((e) => e.status === "Pending").length.toString().padStart(2, "0")}</strong>
          <Clock size={19} />
        </div>
        <div className="panel event-summary-card">
          <span>Approved</span>
          <strong>{events.filter((e) => e.status === "Approved").length.toString().padStart(2, "0")}</strong>
          <CheckCircle2 size={19} />
        </div>
        <div className="panel event-summary-card">
          <span>Rejected</span>
          <strong>{events.filter((e) => e.status === "Rejected").length.toString().padStart(2, "0")}</strong>
          <X size={19} />
        </div>
      </div>

      <section className="panel history-panel">
        <div className="panel-heading">
          <div>
            <h3>All Security Events</h3>
            <p>Review triggered security rules and their outcomes.</p>
          </div>
          <span className="record-count">{filteredEvents.length} events</span>
        </div>

        <div className="history-toolbar">
          <div className="history-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
            />
          </div>

          <div className="filter-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>TRIGGER REASON</th>
                <th>DATE & TIME</th>
                <th>DURATION</th>
                <th>OWNER DECISION</th>
                <th>EVIDENCE</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <strong>{event.title}</strong>
                    <div className="visitor-id-sub">{event.id}</div>
                  </td>
                  <td className="reason-cell">{event.reason}</td>
                  <td>
                    <strong>{event.date}</strong>
                    <div className="visitor-id-sub">{event.time}</div>
                  </td>
                  <td>{event.duration}</td>
                  <td>
                    <span className={`decision-badge ${event.status.toLowerCase()}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <span className="evidence-indicator">
                      <Camera size={13} />
                      {event.evidence.includes("video") ? "Photo + video" : "Photo"}
                    </span>
                  </td>
                  <td>
                    <button className="table-more" onClick={() => setSelectedEvent(event)}>
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table">
                    No security events match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {filteredEvents.length} of {events.length} sample events
        </div>
      </section>

      {selectedEvent && (
        <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="visit-modal event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="panel-heading">
              <div>
                <h3>Security Event Details</h3>
                <p>{selectedEvent.id}</p>
              </div>
              <button className="table-more" onClick={() => setSelectedEvent(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="event-reason-box">
              <AlertTriangle size={18} />
              <div>
                <strong>{selectedEvent.title}</strong>
                <p>{selectedEvent.reason}</p>
              </div>
            </div>

            <div className="modal-details">
              <div><span>Date</span><strong>{selectedEvent.date}</strong></div>
              <div><span>Time</span><strong>{selectedEvent.time}</strong></div>
              <div><span>Duration</span><strong>{selectedEvent.duration}</strong></div>
              <div><span>Owner decision</span><strong>{selectedEvent.status}</strong></div>
              <div><span>Evidence</span><strong>{selectedEvent.evidence}</strong></div>
            </div>

            <div className="event-modal-actions">
              <button
                className="allow-button"
                onClick={() => updateStatus(selectedEvent.id, "Approved")}
              >
                <CheckCircle2 size={15} />
                Allow Once
              </button>
              <button
                className="reject-button"
                onClick={() => updateStatus(selectedEvent.id, "Rejected")}
              >
                <X size={15} />
                Reject
              </button>
            </div>

            <p className="modal-note">
              Prototype only: these decisions update local sample data. Real alarm and recording
              controls will be connected through the backend.
            </p>
          </div>
        </div>
      )}

      <p className="demo-disclaimer">
        Sample security events. Evidence files and owner decisions will be loaded from SQLite.
      </p>
    </div>
  );
}
