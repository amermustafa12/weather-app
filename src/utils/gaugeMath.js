// Small helpers for drawing an analog-instrument style arc gauge with SVG.

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Maps a value in [min, max] to an angle in [startAngle, startAngle + sweep].
export function angleForValue(value, min, max, startAngle, sweep) {
  const ratio = (clamp(value, min, max) - min) / (max - min);
  return startAngle + ratio * sweep;
}

// Converts a polar coordinate (angle measured clockwise from the top, like a
// clock face) into an SVG x/y pair around a center point.
export function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// Builds an SVG arc path between two angles on a circle.
export function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}
