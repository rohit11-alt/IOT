
import { useMemo, useState } from "react";
import {
  Search,
  Image,
  Video,
  CalendarDays,
  Download,
  Eye,
  Camera,
  ShieldAlert,
  Clock,
  X,
} from "lucide-react";

type Evidence = {
  id: string;
  eventId: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "Snapshot" | "Video";
  classification: "Normal" | "Unusual";
  reason: string;
};

const sampleEvidence: Evidence[] = [
  {
    id: "EVD-001",
    eventId: "EVT-001",
    title: "Entrance visitor snapshot",
    date: "Nov 12, 2026",
    time: "10:18 AM",
    duration: "12 sec",
    type: "Video",
    classification: "Unusual",
    reason: "Prolonged presence detected",
  },
  {
    id: "EVD-002",
    eventId: "EVT-001",
    title: "Visitor entry snapshot",
    date: "Nov 12, 2026",
    time: "10:18 AM",
    duration: "12 sec",
    type: "Snapshot",
    classification: "Unusual",
    reason: "Prolonged presence detected",
  },
  {
    id: "EVD-003",
    eventId: "VIS-001",
    title: "Normal visitor capture",
    date: "Nov 12, 2026",
    time: "10:42 AM",
    duration: "3 sec",
    type: "Snapshot",
    classification: "Normal",
    reason: "Normal short visit",
  },
  {
    id: "EVD-004",
    eventId: "EVT-002",
    title: "Repeated approach recording",
    date: "Nov 12, 2026",
    time: "09:32 AM",
    duration: "15 sec",
    type: "Video",
    classification: "Unusual",
    reason: "Repeated approach and leave",
  },
  {
    id: "EVD-005",
    eventId: "VIS-003",
    title: "Visitor snapshot",
    date: "Nov 12, 2026",
    time: "09:56 AM",
    duration: "4 sec",
    type: "Snapshot",
    classification: "Normal",
    reason: "Normal short visit",
  },
  {
    id: "EVD-006",
    eventId: "EVT-003",
    title: "Entrance activity recording",
    date: "Nov 11, 2026",
    time: "04:10 PM",
    duration: "11 sec",
    type: "Video",
    classification: "Unusual",
    reason: "Prolonged presence detected",
  },
];

export default function EvidenceGallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Evidence | null>(null);

  const filteredEvidence = useMemo(() => {
    return sampleEvidence.filter((item) => {
      const matchesSearch =
        `${item.id} ${item.eventId} ${item.title}`.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Evidence Gallery</h1>
          <p>Review captured snapshots and security recordings.</p>
        </div>

        <button className="outline-button">
          <Download size={15} />
          Export evidence
        </button>
      </div>

      <div className="evidence-summary-grid">
        <div className="panel evidence-summary-card">
          <div className="history-stat-icon"><Image size={18} /></div>
          <span>Total snapshots</span>
          <strong>86</strong>
          <small>Captured visitor images</small>
        </div>

        <div className="panel evidence-summary-card">
          <div className="history-stat-icon"><Video size={18} /></div>
          <span>Video recordings</span>
          <strong>24</strong>
          <small>Unusual activity clips</small>
        </div>

        <div className="panel evidence-summary-card">
          <div className="history-stat-icon"><ShieldAlert size={18} /></div>
          <span>Unusual evidence</span>
          <strong>18</strong>
          <small>Associated with security events</small>
        </div>

        <div className="panel evidence-summary-card">
          <div className="history-stat-icon"><Camera size={18} /></div>
          <span>Storage status</span>
          <strong>Local</strong>
          <small>Evidence stored on device</small>
        </div>
      </div>

      <section className="panel history-panel">
        <div className="panel-heading">
          <div>
            <h3>Captured Evidence</h3>
            <p>Browse evidence associated with recorded visitor activity.</p>
          </div>
          <span className="record-count">{filteredEvidence.length} items</span>
        </div>

        <div className="history-toolbar">
          <div className="history-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search evidence or event ID..."
            />
          </div>

          <div className="filter-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All evidence</option>
              <option value="Snapshot">Snapshots</option>
              <option value="Video">Videos</option>
            </select>

            <button className="outline-button">
              <CalendarDays size={15} />
              Date range
            </button>
          </div>
        </div>

        <div className="evidence-grid">
          {filteredEvidence.map((item) => (
            <article className="evidence-card" key={item.id}>
              <div className={`evidence-preview ${item.classification.toLowerCase()}`}>
                <div className="evidence-preview-icon">
                  {item.type === "Video" ? <Video size={29} /> : <Image size={29} />}
                </div>

                <span className="evidence-type">
                  {item.type === "Video" ? "VIDEO" : "IMAGE"}
                </span>

                <span className="evidence-classification">
                  {item.classification}
                </span>

                {item.type === "Video" && (
                  <span className="video-duration">{item.duration}</span>
                )}
              </div>

              <div className="evidence-card-content">
                <div className="evidence-card-title">
                  <strong>{item.title}</strong>
                  <button
                    className="table-more"
                    onClick={() => setSelected(item)}
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                <span className="evidence-event-id">{item.eventId}</span>

                <div className="evidence-meta">
                  <span><CalendarDays size={12} /> {item.date}</span>
                  <span><Clock size={12} /> {item.time}</span>
                </div>

                <div className="evidence-card-footer">
                  <span>{item.reason}</span>
                  <span className={`event-badge ${item.classification.toLowerCase()}`}>
                    {item.classification}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {filteredEvidence.length === 0 && (
            <div className="empty-evidence">
              <Image size={30} />
              <strong>No evidence found</strong>
              <span>Try changing your search or filter.</span>
            </div>
          )}
        </div>

        <div className="table-footer">
          Showing {filteredEvidence.length} of {sampleEvidence.length} sample evidence items
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="visit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="panel-heading">
              <div>
                <h3>Evidence Details</h3>
                <p>{selected.id}</p>
              </div>
              <button className="table-more" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="evidence-modal-preview">
              {selected.type === "Video" ? <Video size={40} /> : <Image size={40} />}
              <strong>{selected.type} preview unavailable</strong>
              <span>Actual evidence will appear after backend integration.</span>
            </div>

            <div className="modal-details">
              <div><span>Title</span><strong>{selected.title}</strong></div>
              <div><span>Event ID</span><strong>{selected.eventId}</strong></div>
              <div><span>Date and time</span><strong>{selected.date}, {selected.time}</strong></div>
              <div><span>Duration</span><strong>{selected.duration}</strong></div>
              <div><span>Classification</span><strong>{selected.classification}</strong></div>
              <div><span>Trigger reason</span><strong>{selected.reason}</strong></div>
            </div>

            <button className="primary-button modal-close" onClick={() => setSelected(null)}>
              Close details
            </button>
          </div>
        </div>
      )}

      <p className="demo-disclaimer">
        Sample evidence metadata. Actual images and video files will be loaded from local storage.
      </p>
    </div>
  );
}
