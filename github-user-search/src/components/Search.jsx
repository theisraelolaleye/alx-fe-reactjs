import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setUser(null);
    setError(null);
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchUserData(query.trim());
      setUser(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Search GitHub Users</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          aria-label="Search username"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 12px', width: 260, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && !loading && (
        <p>Looks like we cant find the user</p>
      )}

      {user && !loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={80}
            height={80}
            style={{ borderRadius: 8 }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{user.name || user.login}</p>
            <p style={{ margin: 0 }}>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                View GitHub Profile
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
