
import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Download,
  MoreHorizontal,
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Eye,
} from "lucide-react";

type Visit = {
  id: string;
  visitor: string;
  date: string;
  time: string;
  duration: string;
  classification: "Normal" | "Unusual";
  status: string;
};

const sampleVisits: Visit[] = [
  { id: "VIS-001", visitor: "Person #001", date: "Nov 12, 2026", time: "10:42 AM", duration: "3 sec", classification: "Normal", status: "Completed" },
  { id: "VIS-002", visitor: "Person #002", date: "Nov 12, 2026", time: "10:18 AM", duration: "12 sec", classification: "Unusual", status: "Reviewed" },
  { id: "VIS-003", visitor: "Person #003", date: "Nov 12, 2026", time: "09:56 AM", duration: "4 sec", classification: "Normal", status: "Completed" },
  { id: "VIS-004", visitor: "Person #004", date: "Nov 12, 2026", time: "09:32 AM", duration: "15 sec", classification: "Unusual", status: "Pending review" },
  { id: "VIS-005", visitor: "Person #005", date: "Nov 11, 2026", time: "08:45 PM", duration: "5 sec", classification: "Normal", status: "Completed" },
  { id: "VIS-006", visitor: "Person #006", date: "Nov 11, 2026", time: "06:20 PM", duration: "2 sec", classification: "Normal", status: "Completed" },
  { id: "VIS-007", visitor: "Person #007", date: "Nov 11, 2026", time: "04:10 PM", duration: "11 sec", classification: "Unusual", status: "Reviewed" },
  { id: "VIS-008", visitor: "Person #008", date: "Nov 10, 2026", time: "11:05 AM", duration: "4 sec", classification: "Normal", status: "Completed" },
];

export default function VisitorHistory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const filteredVisits = useMemo(() => {
    return sampleVisits.filter((visit) => {
      const matchesSearch =
        `${visit.id} ${visit.visitor} ${visit.date}`.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || visit.classification === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Visitor History</h1>
          <p>Review all visitors detected at your monitored entrance.</p>
        </div>

        <button className="outline-button">
          <Download size={15} />
          Export records
        </button>
      </div>

      <div className="history-stats">
        <div className="panel history-stat">
          <div className="history-stat-icon"><Users size={18} /></div>
          <span>Total visits</span>
          <strong>128</strong>
          <small>Recorded visits</small>
        </div>
        <div className="panel history-stat">
          <div className="history-stat-icon"><ShieldCheck size={18} /></div>
          <span>Normal visits</span>
          <strong>120</strong>
          <small>93.7% of total visits</small>
        </div>
        <div className="panel history-stat">
          <div className="history-stat-icon"><ShieldAlert size={18} /></div>
          <span>Unusual visits</span>
          <strong>08</strong>
          <small>Require review or reviewed</small>
        </div>
        <div className="panel history-stat">
          <div className="history-stat-icon"><Clock size={18} /></div>
          <span>Average duration</span>
          <strong>6.4 sec</strong>
          <small>Across recorded visits</small>
        </div>
      </div>

      <section className="panel history-panel">
        <div className="panel-heading">
          <div>
            <h3>All Visitors</h3>
            <p>Browse and filter recorded visitor activity.</p>
          </div>
          <span className="record-count">{filteredVisits.length} records</span>
        </div>

        <div className="history-toolbar">
          <div className="history-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search visitor ID..."
            />
          </div>

          <div className="filter-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All classifications</option>
              <option value="Normal">Normal</option>
              <option value="Unusual">Unusual</option>
            </select>

            <button className="outline-button">
              <CalendarDays size={15} />
              Date range
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>VISITOR ID</th>
                <th>DATE & TIME</th>
                <th>DURATION</th>
                <th>CLASSIFICATION</th>
                <th>REVIEW STATUS</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit.id}>
                  <td>
                    <strong>{visit.id}</strong>
                    <div className="visitor-id-sub">{visit.visitor}</div>
                  </td>
                  <td>
                    <strong>{visit.date}</strong>
                    <div className="visitor-id-sub">{visit.time}</div>
                  </td>
                  <td>{visit.duration}</td>
                  <td>
                    <span className={`event-badge ${visit.classification.toLowerCase()}`}>
                      <span className="badge-dot" />
                      {visit.classification}
                    </span>
                  </td>
                  <td>
                    <span className="review-status">{visit.status}</span>
                  </td>
                  <td>
                    <button
                      className="table-more"
                      title="View visit"
                      onClick={() => setSelectedVisit(visit)}
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredVisits.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-table">
                    No visitor records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {filteredVisits.length} of {sampleVisits.length} sample records
        </div>
      </section>

      {selectedVisit && (
        <div className="modal-backdrop" onClick={() => setSelectedVisit(null)}>
          <div className="visit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="panel-heading">
              <div>
                <h3>Visitor Details</h3>
                <p>{selectedVisit.id}</p>
              </div>
              <button className="table-more" onClick={() => setSelectedVisit(null)}>
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="modal-details">
              <div><span>Visitor</span><strong>{selectedVisit.visitor}</strong></div>
              <div><span>Date</span><strong>{selectedVisit.date}</strong></div>
              <div><span>Time</span><strong>{selectedVisit.time}</strong></div>
              <div><span>Duration</span><strong>{selectedVisit.duration}</strong></div>
              <div><span>Classification</span><strong>{selectedVisit.classification}</strong></div>
              <div><span>Review status</span><strong>{selectedVisit.status}</strong></div>
            </div>
            <button className="primary-button modal-close" onClick={() => setSelectedVisit(null)}>
              Close details
            </button>
          </div>
        </div>
      )}

      <p className="demo-disclaimer">
        Sample visitor records for interface development. Real records will be loaded from SQLite.
      </p>
    </div>
  );
}
