import axios from 'axios';
import apiKeys from '../apiKeys';

const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;

const getUser = gitHubUserName => new Promise((resolve, reject) => {
  axios
    .get(`https://api.github.com/users/${gitHubUserName}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

const getCommits = gitHubUserName => new Promise((resolve, reject) => {
  axios
    .get(`https://api.github.com/users/${gitHubUserName}/events/public`)
    .then((result) => {
      let commitsCount = 0;
      const commitsArray = result.data.filter(event => event.type === 'PushEvent');
      commitsArray.forEach((commit) => {
        commitsCount += commit.payload.commits.length;
      });
      resolve(commitsCount);
    })
    .catch(err => reject(err));
});

export default { getUser, getCommits };
