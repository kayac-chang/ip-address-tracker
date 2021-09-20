import React from "react";

type DataProps = {
  title: string;
  value: string;
};
export function Data({ title, value }: DataProps) {
  return (
    <div>
      <p>{title}</p>

      <strong>{value}</strong>
    </div>
  );
}
