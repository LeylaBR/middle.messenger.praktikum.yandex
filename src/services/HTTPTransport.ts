interface OptionsType {
  method: string;
  headers: Record<string, any>;
  data?: any;
  timeout?: number | string;
  withCredentials?: boolean;
}

type OptionsArg = OptionsType | {};

type HTTPMethod = (url: string, options?: OptionsArg) => any;

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

function queryStringify(data: Record<string, any>) {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}

class HTTPTransport {
  parseResponse(response: any) {
    let parsedData;

    const isFile = response.getResponseHeader('Content-Type') === 'image/jpeg';

    if (isFile || response.response === 'OK') {
      parsedData = response;
    } else {
      try {
        parsedData = JSON.parse(response.response);
      } catch (e) {
        parsedData = response;
      }
    }

    return parsedData;
  }

  get: HTTPMethod = (url, options) => {
    const newUrl = options && (options as any).data
      ? `${BASE_URL}${url}?${queryStringify((options as any).data)}`
      : `${BASE_URL}${url}`;
    return this.request(newUrl, {
      ...options,
      method: METHODS.GET,
    });
  };

  put: HTTPMethod = (url, options) =>
    this.request(`${BASE_URL}${url}`, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) =>
    this.request(`${BASE_URL}${url}`, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options) =>
    this.request(`${BASE_URL}${url}`, { ...options, method: METHODS.DELETE });

  request: HTTPMethod = (
    url,
    options = { method: METHODS.GET },
    timeout = 5000
  ) => {
    const { data, method, withCredentials = true }: any = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = withCredentials;

      if (method === METHODS.GET && data) {
        xhr.open(method, url);
      } else {
        xhr.open(method, url);
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
      }

      xhr.onload = () => {
        const parsedData = this.parseResponse(xhr);
        resolve(parsedData);
      };

      xhr.timeout = timeout;

      xhr.onerror = reject;
      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };
    });
  };
}

export default HTTPTransport;
