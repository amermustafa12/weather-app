export function formatLocalTime(timezoneOffsetInSeconds: number): string {
  const utcDate = new Date();
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 + timezoneOffsetInSeconds * 1000
  );

  const formattedDate = localDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate} | ${formattedTime}`;
}

// Sunrise/sunset come back as Unix timestamps (UTC seconds). This converts
// one to a clock time in the city's own timezone, e.g. "5:42 AM".
export function formatClockTime(unixSeconds: number, timezoneOffsetInSeconds: number): string {
  const utcMillis = unixSeconds * 1000;
  const localDate = new Date(utcMillis + timezoneOffsetInSeconds * 1000);

  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}
