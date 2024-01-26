interface OptionsType {
  method: string;
  headers: Record<string, unknown>;
  data: unknown;
  timeout?: number | string;
  withCredentials?: boolean;
}

type OptionsArg = OptionsType | {};

type HTTPMethod = <R>(url: string, options?: OptionsArg) => Promise<R>;

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

function queryStringify(data: Record<string, unknown>) {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}

class HTTPTransport {
  parseResponse(response: XMLHttpRequest) {
    let parsedData;

    const isFile = response.getResponseHeader('Content-Type') === 'image/jpeg';

    if (isFile || response.response === 'OK') {
      parsedData = response;
    } else {
      parsedData = JSON.parse(response.response);
    }

    return parsedData;
  }

  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  request = (url, options = { method: METHODS.GET }, timeout = 5000) => {
    const { data, method, withCredentials = true }: unknown = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = withCredentials;

      if (method === METHODS.GET && data) {
        xhr.open(method, `${BASE_URL}${url}?${queryStringify(data)}`);
      } else {
        xhr.open(method, `${BASE_URL}${url}`);
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
