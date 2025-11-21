export default function normalizeState(name = "") {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");
}
