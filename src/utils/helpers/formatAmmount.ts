export function formatAmmount(value: number, fixed = 1) {
  if (value >= 1000) {
    return (value / 1000).toFixed(fixed) + 'k+';
  }
  return `${value}`;
}
