import { feature } from "topojson-client";

export function safeConvert(topology) {
  if (!topology?.objects) return null;

  const keys = Object.keys(topology.objects);
  const key =
    keys.find((k) => topology.objects[k].type === "GeometryCollection") ||
    keys[0];

  return feature(topology, topology.objects[key]);
}
