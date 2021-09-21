import React, { useEffect, useState } from "react";
import { Geolocation, Location } from "./api";
import { Map, Search, Data } from "./components";
import { isIP, isFQDN } from "validator";
import { URLSearchParams } from "./utils";

function search(terms: string) {
  if (isFQDN(terms)) return Geolocation.search({ domain: terms });

  if (isIP(terms)) return Geolocation.search({ ipAddress: terms });

  return Geolocation.search();
}

function App() {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    const terms = URLSearchParams(window.location.search).search || "";

    search(terms).then(setLocation);
  }, []);

  return (
    <main>
      <header>
        <div>
          <h1>IP Address Tracker</h1>

          <Search onChange={search} />

          <output>
            <ul>
              {location &&
                [
                  { title: "IP ADDRESS", value: location.ip },
                  { title: "LOCATION", value: location.location },
                  { title: "TIMEZONE", value: location.timezone },
                  { title: "ISP", value: location.isp },
                ].map(({ title, value }) => (
                  <li key={title}>
                    <Data title={title} value={value} />
                  </li>
                ))}
            </ul>
          </output>
        </div>
      </header>

      {location && <Map center={[location.lat, location.lng]} zoom={0.4} />}
    </main>
  );
}

export default App;
