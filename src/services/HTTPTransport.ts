const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  post = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  delete = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (url, options = { method: METHODS.GET }, timeout = 5000) => {
    const { headers, data, method } = options;

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
