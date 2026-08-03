import type { SVGProps } from 'react';

// Same hand-drawn line style as WeatherIcon.tsx, so the whole details
// grid feels like one consistent icon set instead of mixed styles.

export function PressureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13 15 9.5M12 8v1.2M6.5 13H7.7M16.3 13h1.2" />
    </svg>
  );
}

export function VisibilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function SunriseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 17h16M6.5 17a5.5 5.5 0 0 1 11 0" />
      <path d="M12 8.5V6M6.8 11.3 5.2 9.7M17.2 11.3l1.6-1.6" />
      <path d="m9 14 3-3 3 3" />
    </svg>
  );
}

export function SunsetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 17h16M6.5 17a5.5 5.5 0 0 1 11 0" />
      <path d="M12 8.5V6M6.8 11.3 5.2 9.7M17.2 11.3l1.6-1.6" />
      <path d="m9 12 3 3 3-3" />
    </svg>
  );
}
