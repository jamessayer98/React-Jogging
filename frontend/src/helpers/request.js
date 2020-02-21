import axios from 'axios';

export const requestSuccess = (type) => `success/${type}`;

export const requestFail = (type) => `fail/${type}`;

export const requestPending = (type) => `pending/${type}`;

const defaultHeaders = (includeToken) => {
  const authRestore = localStorage.getItem('travel_auth');
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  axios.defaults.baseURL = 'http://localhost:8000/api/';

  if (authRestore && includeToken) {
    const token = JSON.parse(authRestore).token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export const request = (url, method = 'GET', body = null, includeToken = true) => {
  const headers = defaultHeaders(includeToken);

  return axios.request({
    headers,
    url,
    method,
    data: body,
  });
}
