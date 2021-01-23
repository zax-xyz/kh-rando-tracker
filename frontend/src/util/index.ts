export function formatItem(item: string): string {
  return item
    .split("/", 2)[1]
    .split("_")
    .map(p => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}
