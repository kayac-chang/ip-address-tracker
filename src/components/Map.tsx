import React, { useEffect, useRef } from "react";
import { icon, map, marker, tileLayer } from "leaflet";
import ICON_LOCATION from "../images/icon-location.svg?url";
import "leaflet/dist/leaflet.css";
import { lerp } from "../utils";

const URL_TEMP = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ICON = icon({ iconUrl: ICON_LOCATION });

type Props = {
  center?: [number, number];
  zoom?: number;
};
export function Map({ center = [0, 0], zoom = 1 }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = map(ref.current).setView([51.505, -0.09], 17);

    instance
      .panTo(center)
      .setZoom(lerp(instance.getMaxZoom(), instance.getMinZoom(), zoom));

    tileLayer(URL_TEMP).addTo(instance);
    marker(center, { icon: ICON }).addTo(instance);

    return () => void instance.remove();
  }, [center]);

  return <div className="map" ref={ref} />;
}
