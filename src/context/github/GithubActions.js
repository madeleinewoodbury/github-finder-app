import axios from 'axios';

const GITHUB_API = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_API,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};

// Get user and repos
export const getuserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  try {
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos?${params}`),
    ]);

    return { user: user.data, repos: repos.data };
  } catch (error) {
    window.location = '/notfound';
  }
};
