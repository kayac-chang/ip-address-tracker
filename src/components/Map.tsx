import React, { useEffect, useRef } from "react";
import { map, tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";

const URL_TEMP = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export function Map() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = map(ref.current).setView([51.505, -0.09], 17);

    tileLayer(URL_TEMP, {
      //
    }).addTo(instance);

    return () => void instance.remove();
  }, []);

  return <div className="map" ref={ref} />;
}
