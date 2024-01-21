interface OptionsType {
  method: string;
  headers: Record<string, unknown>;
  data: unknown;
  timeout?: number | string;
  withCredentials?: boolean;
}

type OptionsArg = OptionsType | {};

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: Record<string, unknown>) {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}

class HTTPTransport {
  get = (url: string, options: OptionsArg = {}) =>
    this.request(url, { ...options, method: METHODS.GET });

  put = (url: string, options: OptionsArg = {}) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post = (url: string, options: OptionsArg = {}) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete = (url: string, options: OptionsArg = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  request = (
    url: string,
    options = { method: METHODS.GET },
    timeout = 5000
  ) => {
    const { data, method, withCredentials = true }: any = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = withCredentials;

      if (method === METHODS.GET && data) {
        xhr.open(method, `${url}?${queryStringify(data)}`);
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
        resolve(xhr);
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
