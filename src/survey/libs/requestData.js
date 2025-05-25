import apiRequest from './apiRequest';

const requestData = (url, method = 'GET', data = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await apiRequest(url, method, data);
      if (res.status < 200 || res.status >= 400) {
        reject(res.data);
        return;
      }
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });

export default requestData;
