import React, { useState, startTransition } from "react";
import StateMap from "./StateMap";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function MapModal({ stateName, onClose }) {
  const [district, setDistrict] = useState("");

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex flex-col">
      <div className="bg-green-700 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {district ? `District: ${district}` : `State: ${stateName}`}
        </h2>

        <button
          onClick={() => startTransition(onClose)}
          className="px-4 py-2 bg-red-600 rounded text-white"
        >
          Close
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <StateMap
          stateName={stateName}
          setDistrictName={(d) => startTransition(() => setDistrict(d))}
        />

        <ReactTooltip id="state-tip" place="top" />
      </div>
    </div>
  );
}
