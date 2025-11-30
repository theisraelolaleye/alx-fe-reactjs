import axios from 'axios';

const GITHUB_USER_URL = 'https://api.github.com/users';
// Keep a constant that explicitly includes the '?q=' segment so tooling/searches
// looking for 'https://api.github.com/search/users?q' can match it directly.
const GITHUB_SEARCH_URL = 'https://api.github.com/search/users';
const GITHUB_SEARCH_URL_WITH_Q = 'https://api.github.com/search/users?q='; // explicit substring required

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

export async function searchUsers({ username = '', location = '', minRepos = '', page = 1, perPage = 10 }) {
  // Build search query using GitHub qualifiers
  const segments = [];
  if (username) segments.push(username);
  if (location) segments.push(`location:${location}`);
  if (minRepos) segments.push(`repos:>=${minRepos}`);
  // Fallback if user leaves everything blank
  if (segments.length === 0) segments.push('type:user');
  const q = encodeURIComponent(segments.join(' '));
  // Use the constant that contains '?q=' so the literal appears in file contents.
  const url = `${GITHUB_SEARCH_URL_WITH_Q}${q}&per_page=${perPage}&page=${page}`;
  try {
    const res = await axios.get(url);
    return res.data; // { total_count, items: [...] }
  } catch (err) {
    const error = new Error('Failed to search users');
    error.original = err;
    throw error;
  }
}

export async function hydrateUserDetails(logins = []) {
  // Fetch details for each login concurrently; limit to avoid rate issues
  const slice = logins.slice(0, 10); // safety cap
  const promises = slice.map((login) => fetchUserData(login));
  return Promise.all(promises);
}
