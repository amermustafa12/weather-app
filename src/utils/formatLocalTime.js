export function formatLocalTime(timezoneOffsetInSeconds) {
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
