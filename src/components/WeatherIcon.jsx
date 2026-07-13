// Small hand-drawn line icons so we don't pull in an icon library
// just for six weather conditions.

function SunnyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function CloudyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 9 4 4 0 0 1 17 18H7Z" />
    </svg>
  );
}

function RainyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 15a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 6 4 4 0 0 1 17 15H7Z" />
      <path d="M8 18.5 7 21M12 18.5l-1 2.5M16 18.5l-1 2.5" />
    </svg>
  );
}

function StormIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 13a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 4 4 4 0 0 1 17 13H7Z" />
      <path d="m13 15-3 4h3l-2 4" />
    </svg>
  );
}

function SnowyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 14a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 5 4 4 0 0 1 17 14H7Z" />
      <path d="M8 18v3M12 18v3M16 18v3M6.5 19.5l3-1.5M9.5 21l3-1.5M13.5 19.5l3-1.5" />
    </svg>
  );
}

function FoggyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
      <path d="M5 9h11M4 13h16M4 17h13M15 13a4 4 0 1 0-7.5-1.9" />
    </svg>
  );
}

export default function WeatherIcon({ condition, className }) {
  const c = (condition || '').toLowerCase();

  if (c.includes('clear')) return <SunnyIcon className={className} />;
  if (c.includes('cloud')) return <CloudyIcon className={className} />;
  if (c.includes('thunderstorm')) return <StormIcon className={className} />;
  if (c.includes('rain') || c.includes('drizzle')) return <RainyIcon className={className} />;
  if (c.includes('snow')) return <SnowyIcon className={className} />;
  if (c.includes('mist') || c.includes('fog') || c.includes('haze') || c.includes('smoke')) {
    return <FoggyIcon className={className} />;
  }

  return <SunnyIcon className={className} />;
}
