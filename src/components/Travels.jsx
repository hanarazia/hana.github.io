import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  { name: "England", coords: [-0.1276, 51.5072] },
  { name: "Scotland", coords: [-3.1883, 55.9533] },
  { name: "Canada", coords: [-106.3468, 56.1304] },
  { name: "Pakistan", coords: [69.3451, 30.3753] },
  { name: "Taiwan", coords: [121.5654, 25.033] },
  { name: "Japan", coords: [138.2529, 36.2048] },
  { name: "Turkey", coords: [35.2433, 38.9637] },
  { name: "Saudi Arabia", coords: [45.0792, 23.8859] },
  { name: "Italy", coords: [12.5674, 41.8719] },
  { name: "Alaska", coords: [-149.4937, 64.2008] },
  { name: "Hawaii", coords: [-155.5828, 19.8968] },
  { name: "California", coords: [-119.4179, 36.7783] },
  { name: "Ohio", coords: [-82.9071, 40.4173] },
  { name: "Louisiana", coords: [-91.9623, 30.9843] },
  { name: "New York", coords: [-74.0059, 40.7128] },
  { name: "DC", coords: [-77.0369, 38.9072] },
  { name: "Washington", coords: [-120.7401, 47.7511] },
  { name: "Nevada", coords: [-116.4194, 38.8026] },
  { name: "Arizona", coords: [-111.0937, 34.0489] },
  { name: "Idaho", coords: [-114.742, 44.0682] },
  { name: "Oregon", coords: [-120.5542, 43.8041] },
  { name: "Florida", coords: [-81.5158, 27.9944] },
];

export default function Travels() {
  const [active, setActive] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const label = active
    ? (() => {
        const match = locations.find((loc) => loc.name === active);
        if (!match) return null;
        return (
          <Marker key="active-label" coordinates={match.coords}>
            <text
              textAnchor="middle"
              y={-15}
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "10px",
                fill: "#1a1a1a",
                paintOrder: "stroke",
                stroke: "#ffffff",
                strokeWidth: 3,
                strokeLinejoin: "round",
              }}
            >
              {match.name}
            </text>
          </Marker>
        );
      })()
    : null;

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
      onClick={() => setActive(null)}
    >
      <ComposableMap projectionConfig={{ scale: 180 }} style={{ width: "100%", height: "100%" }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name !== "Antarctica")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#cde1eb"
                  stroke="#666666"
                  strokeWidth={0.25}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#9acbd9" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>

        {locations.map(({ name, coords }) => (
          <Marker key={name} coordinates={coords}>
            <image
              href="/9.png"
              x={-10}
              y={-10}
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                setActive(name);
              }}
              style={{ pointerEvents: "all" }}
            />
          </Marker>
        ))}

        {label}
      </ComposableMap>
    </div>
  );
}