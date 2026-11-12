
import { useState } from "react";
import {
  Camera,
  ShieldCheck,
  ShieldOff,
  User,
  Activity,
  Radio,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Volume2,
  Maximize2,
  RefreshCw,
} from "lucide-react";

export default function LiveMonitor() {
  const [armed, setArmed] = useState(true);
  const [visitor, setVisitor] = useState(true);
  const [decision, setDecision] = useState("Pending");

  const sensors = [
    { name: "Ultrasonic Sensor 1", value: "45.5 cm", state: "Active" },
    { name: "Ultrasonic Sensor 2", value: "80.2 cm", state: "Active" },
    { name: "IR Sensor 1", value: "No obstacle", state: "Active" },
    { name: "IR Sensor 2", value: "No obstacle", state: "Active" },
  ];

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>Live Monitor</h1>
          <p>Monitor your entrance and manage live security activity.</p>
        </div>

        <div className="monitor-controls">
          <span className={`system-status ${armed ? "system-armed" : "system-disarmed"}`}>
            <span className="status-dot" />
            {armed ? "System Armed" : "System Disarmed"}
          </span>

          <button
            className={armed ? "danger-button" : "primary-button"}
            onClick={() => setArmed(!armed)}
          >
            {armed ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
            {armed ? "Disarm System" : "Arm System"}
          </button>
        </div>
      </div>

      <div className="monitor-grid">
        <section className="panel camera-panel">
          <div className="panel-heading">
            <div>
              <h3>Entrance Camera</h3>
              <p>Primary security camera · Camera 01</p>
            </div>
            <span className="camera-live-badge">
              <span className="live-dot" />
              LIVE PREVIEW
            </span>
          </div>

          <div className="camera-preview">
            <div className="camera-placeholder">
              <Camera size={42} strokeWidth={1.2} />
              <strong>Camera feed will appear here</strong>
              <span>Waiting for camera backend connection</span>
            </div>

            <div className="camera-overlay camera-top-left">
              <span className="camera-record-dot" />
              CAMERA 01
            </div>

            <div className="camera-overlay camera-top-right">
              {armed ? "ARMED" : "DISARMED"}
            </div>

            <div className="camera-zone">
              <span>VIRTUAL ENTRANCE ZONE</span>
            </div>

            <div className="camera-overlay camera-bottom">
              <span>Entrance Camera</span>
              <span>Preview mode</span>
            </div>
          </div>

          <div className="camera-toolbar">
            <div className="camera-info">
              <span className="status-dot" />
              Camera connection pending
            </div>
            <div className="camera-actions">
              <button className="icon-button" title="Refresh preview">
                <RefreshCw size={16} />
              </button>
              <button className="icon-button" title="Fullscreen">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="panel visitor-panel">
          <div className="panel-heading">
            <div>
              <h3>Current Visitor</h3>
              <p>Live detection information</p>
            </div>
            <span className="detection-badge">
              {visitor ? "Detected" : "No visitor"}
            </span>
          </div>

          {visitor ? (
            <>
              <div className="visitor-visual">
                <div className="visitor-avatar">
                  <User size={35} />
                </div>
                <strong>Person detected</strong>
                <span>Person ID: #001</span>
              </div>

              <div className="visitor-details">
                <div>
                  <span>Presence duration</span>
                  <strong>00:12 sec</strong>
                </div>
                <div>
                  <span>Detection status</span>
                  <strong className="warning-text">Prolonged presence</strong>
                </div>
                <div>
                  <span>Activity classification</span>
                  <strong className="warning-text">Unusual activity</strong>
                </div>
                <div>
                  <span>Owner decision</span>
                  <strong>{decision}</strong>
                </div>
              </div>

              <div className="visitor-decision">
                <p>Owner action</p>
                <button
                  className="allow-button"
                  onClick={() => setDecision("Allowed once")}
                >
                  <CheckCircle2 size={15} />
                  Allow Once
                </button>
                <button
                  className="reject-button"
                  onClick={() => setDecision("Rejected")}
                >
                  <XCircle size={15} />
                  Reject Visitor
                </button>
                <button
                  className="outline-button silence-button"
                  onClick={() => setDecision("Alarm silenced")}
                >
                  <Volume2 size={15} />
                  Silence Alarm
                </button>
              </div>
            </>
          ) : (
            <div className="empty-visitor">
              <User size={35} />
              <strong>No person detected</strong>
              <span>The entrance zone is currently clear.</span>
            </div>
          )}

          <button
            className="simulation-button"
            onClick={() => {
              setVisitor(!visitor);
              setDecision("Pending");
            }}
          >
            {visitor ? "Simulate visitor leaving" : "Simulate visitor detection"}
          </button>
        </section>
      </div>

      <div className="monitor-lower-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Sensor Readings</h3>
              <p>Hardware controller information</p>
            </div>
            <Radio size={18} className="muted-icon" />
          </div>

          <div className="sensor-reading-list">
            {sensors.map((sensor) => (
              <div className="sensor-reading" key={sensor.name}>
                <div>
                  <strong>{sensor.name}</strong>
                  <span>{sensor.state}</span>
                </div>
                <strong>{sensor.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Security Activity</h3>
              <p>Current monitoring information</p>
            </div>
            <Activity size={18} className="muted-icon" />
          </div>

          <div className="activity-information">
            <div className="activity-item">
              <div className="activity-icon">
                <Clock size={17} />
              </div>
              <div>
                <strong>Presence monitoring</strong>
                <span>Prototype dwell-time rules enabled</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <AlertTriangle size={17} />
              </div>
              <div>
                <strong>Unusual activity rules</strong>
                <span>Prolonged presence and repeated approach</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <Camera size={17} />
              </div>
              <div>
                <strong>Evidence recording</strong>
                <span>Waiting for camera integration</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <p className="demo-disclaimer">
        Simulation mode: visitor details and sensor readings are sample values.
        Owner actions currently update local interface state only.
      </p>
    </div>
  );
}
