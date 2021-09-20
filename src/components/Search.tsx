import React from "react";
import Icon from "./Icon";

export function Search() {
  return (
    <label>
      <span className="sr-only">Search</span>

      <input
        type="search"
        name="search"
        placeholder="Search for any IP address or domain"
      />

      <button>
        <span className="sr-only">Search</span>

        <Icon.Arrow />
      </button>
    </label>
  );
}
