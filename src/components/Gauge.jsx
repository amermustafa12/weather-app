import { angleForValue, describeArc, polarToCartesian } from '../utils/gaugeMath';

const START_ANGLE = -130;
const END_ANGLE = 130;
const SWEEP = END_ANGLE - START_ANGLE;
const RADIUS = 82;
const CENTER = 100;

export default function Gauge({ value, min = -20, max = 50, unit = '°C', tickCount = 7 }) {
  const needleAngle = angleForValue(value, min, max, START_ANGLE, SWEEP);
  const trackPath = describeArc(CENTER, CENTER, RADIUS, START_ANGLE, END_ANGLE);
  const valuePath = describeArc(CENTER, CENTER, RADIUS, START_ANGLE, needleAngle);

  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => min + ((max - min) / tickCount) * i);

  return (
    <div className="gauge" role="img" aria-label={`Temperature ${Math.round(value)} degrees Celsius`}>
      <svg viewBox="0 0 200 200" className="gauge-svg" aria-hidden="true">
        <path d={trackPath} className="gauge-track" fill="none" />
        <path d={valuePath} className="gauge-value" fill="none" />

        {ticks.map((t) => {
          const angle = angleForValue(t, min, max, START_ANGLE, SWEEP);
          const outer = polarToCartesian(CENTER, CENTER, RADIUS + 7, angle);
          const inner = polarToCartesian(CENTER, CENTER, RADIUS - 3, angle);
          const labelPos = polarToCartesian(CENTER, CENTER, RADIUS - 22, angle);
          return (
            <g key={t}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} className="gauge-tick" />
              <text x={labelPos.x} y={labelPos.y} className="gauge-tick-label" textAnchor="middle" dominantBaseline="middle">
                {Math.round(t)}
              </text>
            </g>
          );
        })}

        <g className="gauge-needle-group" style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: `${CENTER}px ${CENTER}px` }}>
          <line x1={CENTER} y1={CENTER + 10} x2={CENTER} y2={CENTER - RADIUS + 16} className="gauge-needle" />
        </g>
        <circle cx={CENTER} cy={CENTER} r="7" className="gauge-hub" />
      </svg>

      <div className="gauge-readout">
        <span className="gauge-value-text">{Math.round(value)}</span>
        <span className="gauge-unit">{unit}</span>
      </div>
    </div>
  );
}
