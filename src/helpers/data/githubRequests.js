import axios from 'axios';
import apiKeys from '../apiKeys';

const githubApiUrl = apiKeys.githubApi.apiUrl;
const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;

const getUser = userName => new Promise((resolve, reject) => {
  axios
    .get(`${githubApiUrl}/${userName}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      resolve(result.data);
      console.log(result.data);
    })
    .catch(err => reject(err));
});

export default { getUser };
