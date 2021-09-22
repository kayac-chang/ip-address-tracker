import React, { FormEvent } from "react";
import Icon from "./Icon";
import { FormData } from "../utils";

type Props = {
  onChange?: (value: string) => void;
};
export function Search({ onChange }: Props) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onChange?.(FormData(event.currentTarget).search as string);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="search">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        <input
          id="search"
          type="search"
          name="search"
          placeholder="Search for any IP address or domain"
        />

        <button>
          <span className="sr-only">Search</span>

          <Icon.Arrow />
        </button>
      </div>
    </form>
  );
}
