import React, { useCallback, useEffect, useState } from "react";
import { Geolocation, Location } from "./api";
import { Map, Search, Data } from "./components";
import { isIP, isFQDN } from "validator";

function App() {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    Geolocation.search().then(setLocation);
  }, []);

  return (
    <main>
      <header>
        <div>
          <h1>IP Address Tracker</h1>

          <Search
            onChange={(terms) => {
              if (isFQDN(terms))
                Geolocation.search({ domain: terms }).then(setLocation);

              if (isIP(terms))
                Geolocation.search({ ipAddress: terms }).then(setLocation);
            }}
          />

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
