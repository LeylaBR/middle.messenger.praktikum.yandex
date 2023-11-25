interface OptionsType {
  method: string;
  timeout?: number;
  headers: Record<string, unknown>;
  data: unknown;
}

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
  get = (url: string, options: OptionsType = {} as OptionsType) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url: string, options: OptionsType = {} as OptionsType) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (url: string, options: OptionsType = {} as OptionsType) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url: string, options: OptionsType = {} as OptionsType) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (
    url: string,
    options = { method: METHODS.GET },
    timeout = 5000
  ) => {
    const { headers, data, method }: any = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        xhr.open(method, `${url}?${queryStringify(data)}`);
      } else {
        xhr.open(method, url);
      }

      if (headers) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      if (method === METHODS.GET || method === METHODS.DELETE || !data) {
        xhr.send();
      } else {
        xhr.send(data);
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
