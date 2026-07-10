function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

export default function ReadoutBar({ icon, label, value, unit, ratio }) {
  return (
    <div className="readout-row">
      <div className="readout-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="readout-main">
        <div className="readout-label">{label}</div>
        <div className="readout-track">
          <div className="readout-fill" style={{ width: `${clamp01(ratio) * 100}%` }} />
        </div>
      </div>
      <div className="readout-value">
        {value}
        <span className="readout-unit">{unit}</span>
      </div>
    </div>
  );
}
