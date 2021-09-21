import { URL } from "./base";

const API = import.meta.env.VITE_GEO_LOCATION_API as string;
const KEY = import.meta.env.VITE_GEO_LOCATION_KEY as string;

const toJSON = (res: Response) => res.json();

export interface Location {
  ip: string;
  isp: string;
  location: string;
  timezone: string;

  lat: number;
  lng: number;
}

const getISP = (res: any) => res.isp || "";
const getIP = (res: any) => res.ip || "";
const getLocation = (res: any) =>
  "location" in res
    ? `${res.location.city}, ${res.location.country} ${res.location.geonameId}`
    : "";
const getTimezone = (res: any) =>
  "location" in res ? `UTC ${res.location.timezone}` : "";

const getLat = (res: any) => ("location" in res ? res.location.lat : 0);
const getLng = (res: any) => ("location" in res ? res.location.lng : 0);

function fromIpify(res: unknown): Location {
  if (typeof res !== "object" || !res) throw `unexpected input type`;

  return {
    isp: getISP(res),
    ip: getIP(res),
    location: getLocation(res),
    timezone: getTimezone(res),
    lat: getLat(res),
    lng: getLng(res),
  };
}

type Props = {
  ipAddress?: string;
  domain?: string;
};
function search(props?: Props) {
  return fetch(URL({ host: API, params: { apiKey: KEY, ...props } }))
    .then(toJSON)
    .then(fromIpify);
}

export const Geolocation = { search };
