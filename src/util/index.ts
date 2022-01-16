export const formatItem = (item: string): string => {
  if (item === "Free") {
    return "GoA/Critical Extra";
  }

  return item
    .split("/", 2)[1]
    .split("_")
    .map(p => p[0].toUpperCase() + p.slice(1))
    .join(" ");
};
