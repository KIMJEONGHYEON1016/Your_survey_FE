import axios from 'axios';
import cookies from 'react-cookies';

export default function apiRequest(url, method = 'GET', data, headers) {
  if (!/^http[s]?/i.test(url)) {
    url = process.env.NEXT_PUBLIC_API_URL + url;
    console.log(url);
  }

  const options = {
    method,
    url,
    validateStatus: (status) => status < 500,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data) {
    options.data = data;
  }

  const token = cookies.load('token');
  if (token?.trim()) {
    headers = headers ?? {};
    headers.Authorization = `Bearer ${token}`;
  }

  if (headers) options.headers = headers;

  return axios(options);
}
