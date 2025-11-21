import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { feature } from "topojson-client";

export default function MapChart({ onStateClick }) {
  const [geoJson, setGeoJson] = useState(null);

  useEffect(() => {
    fetch("/maps/india.json")
      .then((r) => r.json())
      .then((topo) => {
        const key = Object.keys(topo.objects)[0];
        setGeoJson(feature(topo, topo.objects[key]));
      });
  }, []);

  if (!geoJson) return null;

  return (
    <div className="flex justify-center items-center h-full pt-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1200, center: [82, 23] }}
        width={650}
        height={650}
      >
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo, i) => {
              const name =
                geo.properties?.ST_NM ||
                geo.properties?.NAME_1 ||
                `STATE-${i}`;

              return (
                <Geography
                  key={name}
                  geography={geo}
                  onClick={() => onStateClick(name)}
                  style={{
                    default: { fill: "#efefef", stroke: "#555", strokeWidth: 0.5 },
                    hover: { fill: "#6bee70" },
                    pressed: { fill: "#1f8f34" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
