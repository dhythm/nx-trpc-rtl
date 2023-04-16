type Response<T = any> =
  | {
      statusCode: number;
      data: T;
      error: null;
    }
  | {
      statusCode: number;
      data: null;
      error: Error;
    };

type Props = {
  host?: string;
  path: string;
  method: 'GET' | 'DELETE' | 'HEAD' | 'POST' | 'PUT' | 'PATCH';
  header?: { [key: string]: string };
  payload?: { [key: string]: any };
};
export const fetchApi = async <T = unknown>({
  host = 'localhost:3000',
  path,
  method,
  header,
  payload,
}: Props): Promise<Response<T>> => {
  const url = new URL(`${host}${path}`);

  const headers = {
    ...(method !== 'GET' && {
      'Content-Type': 'application/json; charset=utf-8',
    }),
    ...header,
  };

  const options: RequestInit = {
    method,
    headers,
    ...(method !== 'GET' && {
      body: JSON.stringify(payload),
    }),
  };

  if (method === 'GET') {
    for (const key in payload) {
      const value = payload[key];
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else if (value !== undefined || value !== null) {
        url.searchParams.append(key, value);
      }
    }
    if (!header) {
      delete options.headers;
    }
  }

  try {
    const res = await fetch(url.toString(), options);
    const statusCode = res.status;
    const data = await res.json();

    if (statusCode !== 200) {
      return {
        statusCode,
        data: null,
        error: new Error(),
      };
    }

    return {
      statusCode,
      data: data || ({} as T),
      error: null,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: null,
      error: new Error(),
    };
  }
};
