import { Fetcher } from 'swr';

export const fetcher: Fetcher = (...args: any[]) => {
  // @ts-ignore
  return fetch(...args).then((res) => res.json());
};

// @ts-ignore
// export const fetcher = (...args) => {fetch(...args).then(res => res.json())}
