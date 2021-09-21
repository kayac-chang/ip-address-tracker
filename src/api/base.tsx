type Props = {
  host: string;
  params: { [key: string]: string };
};
export function URL({ host, params }: Props) {
  const instance = new globalThis.URL(host);

  for (const [key, value] of Object.entries(params)) {
    instance.searchParams.append(key, value);
  }

  return instance.toString();
}
