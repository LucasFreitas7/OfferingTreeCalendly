export function getAvailableDays(data: { data: { available_times: string[] } }): string[] {
  const availableTimes = data.data.available_times;
  const uniqueDays = new Set<string>();

  availableTimes.forEach((time) => {
    const date = time.split("T")[0];
    uniqueDays.add(date);
  });

  return Array.from(uniqueDays).sort();
}
