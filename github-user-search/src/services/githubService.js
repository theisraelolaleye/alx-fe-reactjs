import axios from 'axios';

const GITHUB_USER_URL = 'https://api.github.com/users';

export async function fetchUserData(username) {
  if (!username) throw new Error('username required');
  try {
    const res = await axios.get(`${GITHUB_USER_URL}/${encodeURIComponent(username)}`);
    return res.data;
  } catch (err) {
    // normalize error for caller
    const error = new Error('Failed to fetch user');
    error.original = err;
    throw error;
  }
}
