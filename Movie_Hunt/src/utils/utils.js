export function convertMinutes(min) {
  const hours = Math.floor(min / 60);
  const remin = min % 60;
  return `${hours}h ${remin}m`;
}
