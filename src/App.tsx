import React from "react";
import { Map, Search, Data } from "./components";

function App() {
  const results = [
    { title: "IP ADDRESS", value: "192.212.174.101" },
    { title: "LOCATION", value: "Brooklyn, NY 10001" },
    { title: "TIMEZONE", value: "UTC -05:00" },
    { title: "ISP", value: "SpaceX Starlink" },
  ];

  return (
    <main>
      <header>
        <div>
          <h1>IP Address Tracker</h1>

          <form>
            <Search />
          </form>

          <output>
            <ul>
              {results.map(({ title, value }) => (
                <li key={title}>
                  <Data title={title} value={value} />
                </li>
              ))}
            </ul>
          </output>
        </div>
      </header>

      <Map />
    </main>
  );
}

export default App;
