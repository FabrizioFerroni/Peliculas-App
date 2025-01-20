export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (1-12)
  const day = date.getDate().toString().padStart(2, '0'); // Día (1-31)
  return `${year}-${month}-${day}`;
}
