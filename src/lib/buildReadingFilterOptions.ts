function capitalizeWords(str: string): string {
  return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function buildReadingFilterOptions(
  readings: any[],
  field: 'category' | 'subject' | 'topic',
  current?: string,
  urlBuilder: (item: string) => string
) {
  const items = [...new Set(readings.map(reading => reading.data[field]).filter(Boolean))].sort();
  
  return items.map(item => {
    const count = readings.filter(reading => reading.data[field] === item).length;
    return {
      label: capitalizeWords(item),
      count,
      href: urlBuilder(item),
      isActive: current === item,
    };
  });
}