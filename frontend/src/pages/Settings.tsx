
import { useState } from "react";
import {
  Settings2,
  Shield,
  Bell,
  Camera,
  Cpu,
  Save,
  RotateCcw,
} from "lucide-react";

import "../App.css";

export default function Settings() {
  const [systemName, setSystemName] = useState("SentinelAI");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [defaultArmed, setDefaultArmed] = useState(true);
  const [dwellThreshold, setDwellThreshold] = useState(8);
  const [exitGrace, setExitGrace] = useState(3);

  const [telegramEnabled, setTelegramEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const [cameraSource, setCameraSource] = useState("0");
  const [confidence, setConfidence] = useState(60);

  const [cameraStatus] = useState("Not connected");
  const [arduinoStatus] = useState("Not connected");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const settings = {
      systemName,
      timezone,
      defaultArmed,
      dwellThreshold,
      exitGrace,
      telegramEnabled,
      soundEnabled,
      reminderEnabled,
      cameraSource,
      confidence,
    };

    localStorage.setItem("sentinelai-settings", JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setSystemName("SentinelAI");
    setTimezone("Asia/Kolkata");
    setDefaultArmed(true);
    setDwellThreshold(8);
    setExitGrace(3);
    setTelegramEnabled(true);
    setSoundEnabled(true);
    setReminderEnabled(true);
    setCameraSource("0");
    setConfidence(60);
    setSaved(false);
  };

  return (
    <div className="page-content settings-page">
      <div className="page-heading settings-heading">
        <div>
          <h1>Settings</h1>
          <p>Manage your security system preferences and configurations.</p>
        </div>

        <div className="settings-heading-actions">
          <button className="outline-button" onClick={handleReset}>
            <RotateCcw size={15} />
            Reset
          </button>

          <button className="primary-button" onClick={handleSave}>
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="settings-success">
          Settings saved in this browser.
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-main">

          <section className="panel settings-section">
            <div className="settings-section-heading">
              <div className="settings-icon">
                <Settings2 size={18} />
              </div>
              <div>
                <h3>General Settings</h3>
                <p>Basic information about your SentinelAI system.</p>
              </div>
            </div>

            <div className="settings-fields">
              <label className="settings-field">
                <span>System Name</span>
                <input
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  placeholder="Enter system name"
                />
              </label>

              <label className="settings-field">
                <span>Timezone</span>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Asia/Kolkata">India (Asia/Kolkata)</option>
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dubai">Dubai</option>
                  <option value="Europe/London">London</option>
                </select>
              </label>
            </div>
          </section>

          <section className="panel settings-section">
            <div className="settings-section-heading">
              <div className="settings-icon">
                <Shield size={18} />
              </div>
              <div>
                <h3>Security Configuration</h3>
                <p>Configure how SentinelAI evaluates entrance activity.</p>
              </div>
            </div>

            <div className="settings-toggle-row">
              <div>
                <strong>Start in Armed Mode</strong>
                <p>Prefer armed mode when the system starts.</p>
              </div>
              <input
                type="checkbox"
                checked={defaultArmed}
                onChange={(e) => setDefaultArmed(e.target.checked)}
              />
            </div>

            <div className="settings-fields">
              <label className="settings-field">
                <span>Unusual Activity Threshold</span>
                <div className="settings-input-suffix">
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={dwellThreshold}
                    onChange={(e) =>
                      setDwellThreshold(Number(e.target.value))
                    }
                  />
                  <span>seconds</span>
                </div>
                <small>Initial prototype default: 8 seconds.</small>
              </label>

              <label className="settings-field">
                <span>Exit Grace Period</span>
                <div className="settings-input-suffix">
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={exitGrace}
                    onChange={(e) => setExitGrace(Number(e.target.value))}
                  />
                  <span>seconds</span>
                </div>
                <small>Wait before closing a visit after a person leaves.</small>
              </label>
            </div>
          </section>

          <section className="panel settings-section">
            <div className="settings-section-heading">
              <div className="settings-icon">
                <Bell size={18} />
              </div>
              <div>
                <h3>Alert Preferences</h3>
                <p>Choose how the owner receives security alerts.</p>
              </div>
            </div>

            <div className="settings-toggle-row">
              <div>
                <strong>Telegram Notifications</strong>
                <p>Send unusual activity alerts to Telegram.</p>
              </div>
              <input
                type="checkbox"
                checked={telegramEnabled}
                onChange={(e) => setTelegramEnabled(e.target.checked)}
              />
            </div>

            <div className="settings-toggle-row">
              <div>
                <strong>Sound Alarm</strong>
                <p>Play an alert through the connected laptop speaker.</p>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
            </div>

            <div className="settings-toggle-row">
              <div>
                <strong>No-response Reminder</strong>
                <p>Enable a reminder if the owner does not respond.</p>
              </div>
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
              />
            </div>
          </section>

          <section className="panel settings-section">
            <div className="settings-section-heading">
              <div className="settings-icon">
                <Camera size={18} />
              </div>
              <div>
                <h3>Camera Configuration</h3>
                <p>Configure the camera used for person detection.</p>
              </div>
            </div>

            <div className="settings-fields">
              <label className="settings-field">
                <span>Camera Source</span>
                <select
                  value={cameraSource}
                  onChange={(e) => setCameraSource(e.target.value)}
                >
                  <option value="0">Default Laptop Camera (0)</option>
                  <option value="1">Secondary Camera (1)</option>
                  <option value="phone">Smartphone Camera</option>
                </select>
              </label>

              <label className="settings-field">
                <span>Detection Confidence</span>
                <div className="settings-input-suffix">
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={confidence}
                    onChange={(e) => setConfidence(Number(e.target.value))}
                  />
                  <span>%</span>
                </div>
                <small>Higher values require stronger model confidence.</small>
              </label>
            </div>
          </section>
        </div>

        <aside className="settings-side">
          <section className="panel settings-section">
            <div className="settings-section-heading">
              <div className="settings-icon">
                <Cpu size={18} />
              </div>
              <div>
                <h3>Hardware Status</h3>
                <p>Connection overview.</p>
              </div>
            </div>

            <div className="settings-device">
              <div>
                <strong>Camera</strong>
                <span>{cameraStatus}</span>
              </div>
              <span className="settings-status-offline">Offline</span>
            </div>

            <div className="settings-device">
              <div>
                <strong>Arduino Uno</strong>
                <span>{arduinoStatus}</span>
              </div>
              <span className="settings-status-offline">Offline</span>
            </div>

            <div className="settings-device">
              <div>
                <strong>Ultrasonic Sensors</strong>
                <span>2 sensors expected</span>
              </div>
              <span className="settings-status-pending">Pending</span>
            </div>

            <div className="settings-device">
              <div>
                <strong>IR Sensors</strong>
                <span>2 sensors expected</span>
              </div>
              <span className="settings-status-pending">Pending</span>
            </div>
          </section>

          <section className="panel settings-info-card">
            <Shield size={20} />
            <h3>System Information</h3>
            <p>SentinelAI Entrance Security System</p>
            <div><span>Application</span><strong>Frontend Demo</strong></div>
            <div><span>Version</span><strong>1.0.0</strong></div>
            <div><span>Backend</span><strong>Not connected</strong></div>
            <div><span>Database</span><strong>Not connected</strong></div>
          </section>
        </aside>
      </div>

      <p className="settings-disclaimer">
        Demo configuration only. Settings are stored in this browser and are
        not yet connected to the Arduino, camera or backend.
      </p>
    </div>
  );
}
