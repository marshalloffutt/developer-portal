import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = uid => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const resources = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((key) => {
          response.data[key].id = key;
          resources.push(response.data[key]);
        });
      }
      resolve(resources);
    })
    .catch(err => reject(err));
});

const deleteResourceAxios = resourceId => axios.delete(`${firebaseUrl}/resources/${resourceId}.json`);

const updateResourceAxios = (resourceId, isDone) => axios.patch(`${firebaseUrl}/resources/${resourceId}.json`, { isDone });

const postRequest = resource => new Promise((resolve, reject) => {
  axios.post(`${firebaseUrl}/resources.json`, resource)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getRequest,
  deleteResourceAxios,
  updateResourceAxios,
  postRequest,
};
