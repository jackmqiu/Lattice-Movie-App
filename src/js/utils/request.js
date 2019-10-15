import { polyfill } from 'es6-promise';
import axios from 'axios';
// import { deepArrToObj } from './helper';

polyfill();

const request = (url, options) => new Promise((resolve, reject) => {
  if (!url) reject(new Error('URL parameter required'));
  if (!options) reject(new Error('Options parameter required'));
  axios(url, options)
    .then((response) => {
      resolve(response);
      switch (response.status) {
        default: return response;
      }
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        reject(new Error('API server error. Application is either not able to reach its API server or its server is experiencing some internal errors.'));
      }
    });
});

export default request;