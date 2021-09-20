import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export function Map() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const map = L.map(element).setView([51.505, -0.09], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    return () => void map.remove();
  }, []);

  return <div className="map" ref={ref} />;
}
