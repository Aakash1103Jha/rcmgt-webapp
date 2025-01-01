export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchUrl = { path: string } | { absolute: string };
function getUrl(url: FetchUrl) {
  if ('path' in url) return `${apiBaseUrl}${url.path}`;
  return url.absolute;
}
export default async function fetchHelper(
  url: FetchUrl,
  options?: RequestInit,
  loaderCallback?: (loading: boolean) => void
): Promise<any | Error> {
  if (loaderCallback) loaderCallback(true);
  try {
    const res = await fetch(getUrl(url), {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.method === 'GET' ? undefined : options?.body,
      ...options,
    });
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) throw new Error('Invalid content');
    const resData = await res.json();
    if (!res.ok) throw new Error(resData);
    if (loaderCallback) loaderCallback(false);
    return resData;
  } catch (error) {
    if (loaderCallback) loaderCallback(false);
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return error as Error;
  }
}
