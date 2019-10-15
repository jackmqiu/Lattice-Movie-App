import request from './request';

const Api = () => {
  const buildURL = (path = false) => {
    const parameters = [process.env.API_URL];
    if (path) parameters.push(path);
    // parameters.push(`?api_key=${process.env.API_KEY}`);
    return parameters.join('');
  };

  const buildOptions = (path, options, method) => {
    const defaultOptions = {
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };

    return Object.assign(defaultOptions, options, method);
  };

  return {
    post: (path, body, options = {}) => request(buildURL(path), buildOptions(
      path, options,
      { method: 'post', data: JSON.stringify(body) },
    )),
    get: (path, options = {}) => request(buildURL(path), buildOptions(
      path, options,
      { method: 'get' },
    )),

    edit: (path, body, options = {}) => request(buildURL(path), buildOptions(
      path, options,
      { method: 'put', data: JSON.stringify(body) },
    )),

    delete: (path, options = {}) => request(buildURL(path), buildOptions(
      path, options,
      { method: 'delete' },
    )),

    ping: () => request(buildURL(), { method: 'GET' }),
  };
};

export default Api();
