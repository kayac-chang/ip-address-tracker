export function lerp(v0: number, v1: number, t: number) {
  return (1 - t) * v0 + t * v1;
}

export function FormData(target: HTMLFormElement) {
  return Object.fromEntries(new globalThis.FormData(target).entries());
}

export function URLSearchParams(value: string) {
  if (!value) return {};

  return Object.fromEntries(new globalThis.URLSearchParams(value).entries());
}
