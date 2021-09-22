import React, { useCallback, useEffect, useState } from "react";
import { Geolocation, Location } from "./api";
import { Map, Search, Data } from "./components";
import { isIP, isFQDN } from "validator";
import { URLSearchParams } from "./utils";

function App() {
  const [location, setLocation] = useState<Location>();

  const search = useCallback(
    (terms) => {
      if (isFQDN(terms))
        return Geolocation.search({ domain: terms }).then(setLocation);

      if (isIP(terms))
        return Geolocation.search({ ipAddress: terms }).then(setLocation);

      return Geolocation.search().then(setLocation);
    },
    [setLocation]
  );

  useEffect(() => {
    search(URLSearchParams(window.location.search).search || "");
  }, []);

  return (
    <main>
      <header>
        <div>
          <h1>IP Address Tracker</h1>

          <Search onChange={search} />

          <div className="output">
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
          </div>
        </div>
      </header>

      {location && <Map center={[location.lat, location.lng]} zoom={0.4} />}
    </main>
  );
}

export default App;
