export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const resp = await fetch(input, init);
  return resp.json();
}
