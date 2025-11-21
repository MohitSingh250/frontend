import React, { useState } from "react";
import MapChart from "./MapChart";
import StateMap from "./StateMap";

export default function AreaSelector() {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">

      {/* Title */}
      <div className="bg-green-600 p-3 font-bold text-lg">
        {selectedState ? `State: ${selectedState}` : "India"}
      </div>

      {/* INDIA or STATE VIEW */}
      <div className="w-full h-[calc(100%-48px)] relative">

        {/* India Map */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            selectedState ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <MapChart onStateClick={setSelectedState} />
        </div>

        {/* Zoomed State Map */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            selectedState ? "opacity-100 scale-100" : "opacity-0 scale-125 pointer-events-none"
          }`}
        >
          {selectedState && (
            <StateMap stateName={selectedState} onBack={() => setSelectedState("")} />
          )}
        </div>

      </div>
    </div>
  );
}
