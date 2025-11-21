import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import { geoMercator } from "d3-geo";
import normalize from "./normalizeState";
import stateFileMap from "./stateFileMap";
import { safeConvert } from "./safeConvert";

export default function StateMap({ stateName, onBack }) {
  const [geoJson, setGeoJson] = useState(null);
  const [projectionConfig, setProjection] = useState({
    scale: 2000,
    center: [82, 22],
  });

  useEffect(() => {
    const file = stateFileMap[normalize(stateName)];
    if (!file) return;

    fetch(`/maps/states/${file}`)
      .then((r) => r.json())
      .then((topology) => {
        const geo = safeConvert(topology);
        if (!geo) return;

        let proj = geoMercator();
        try {
          proj = proj.fitSize([650, 650], geo);
        } catch {}

        setProjection({
          scale: proj.scale() || 2000,
          center: proj.center() || [82, 22],
        });

        setGeoJson(geo);
      });
  }, [stateName]);

  if (!geoJson) return null;

  return (
    <div className="flex flex-col items-center h-full pt-4">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-red-600 text-white rounded mb-3"
      >
        ← Back to India
      </button>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        width={650}
        height={650}
      >
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo, i) => {
              const district =
                geo.properties?.DISTRICT ||
                geo.properties?.NAME_2 ||
                `DIST-${i}`;

              return (
                <Geography
                  key={district}
                  geography={geo}
                  style={{
                    default: { fill: "#f5f5f5", stroke: "#000", strokeWidth: 0.5 },
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
