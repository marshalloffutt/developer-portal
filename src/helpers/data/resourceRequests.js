import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json`)
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

export default {
  getRequest,
};
