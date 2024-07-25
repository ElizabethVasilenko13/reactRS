const defaultHeaders = ['Name', 'Species', 'Details URL'];

export const convertToCSV = <T>(
  items: Record<string | number, T>,
  dataTransform: (item: T) => string[],
  headers = defaultHeaders
): string => {
  const headerRow = `${headers.join(',')}\n`;
  const rows = Object.values(items)
    .map((item) => dataTransform(item).join(','))
    .join('\n');
  const csvContent = headerRow + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};
