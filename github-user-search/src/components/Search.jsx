import { useState, useEffect } from 'react';
import { searchUsers, hydrateUserDetails, fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]); // hydrated user details
  const [rawItems, setRawItems] = useState([]); // raw search items (logins, etc.)
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [exactUser, setExactUser] = useState(null); // direct fetchUserData result

  // Hydrate details whenever rawItems change
  useEffect(() => {
    async function hydrate() {
      if (!rawItems.length) return;
      const logins = rawItems.map((i) => i.login);
      try {
        const details = await hydrateUserDetails(logins);
        setResults((prev) => {
          // Merge new unique users by login
          const existing = new Map(prev.map((u) => [u.login, u]));
          details.forEach((u) => existing.set(u.login, u));
          return Array.from(existing.values());
        });
      } catch (e) {
        // ignore hydration errors; they will be surfaced if main search fails
      }
    }
    hydrate();
  }, [rawItems]);

  async function executeSearch(resetPage = true) {
    setLoading(true);
    setError(null);
    try {
      const nextPage = resetPage ? 1 : page;
      // If user provided only a username (no other filters) attempt an exact lookup first.
      let fetchedExact = null;
      if (resetPage && username.trim() && !location.trim() && !minRepos.trim()) {
        try {
          fetchedExact = await fetchUserData(username.trim());
          setExactUser(fetchedExact);
        } catch (e) {
          setExactUser(null); // ignore exact miss, continue with search
        }
      } else if (resetPage) {
        setExactUser(null);
      }
      const data = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos.trim(),
        page: nextPage,
        perPage: 10,
      });
      setTotal(data.total_count || 0);
      setInitialSearchDone(true);
      if (resetPage) {
        setPage(1);
        setResults([]);
        setRawItems(data.items || []);
      } else {
        setRawItems((prev) => [...prev, ...(data.items || [])]);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    executeSearch(true);
  }

  async function handleLoadMore() {
    const next = page + 1;
    setPage(next);
    await executeSearch(false);
  }

  const hasMore = results.length < total;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">GitHub User Advanced Search</h1>
      <form onSubmit={handleSubmit} className="search-card space-y-4 mb-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Username</label>
            <input
              id="username"
              className="input-base"
              placeholder="e.g. torvalds"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Location</label>
            <input
              id="location"
              className="input-base"
              placeholder="e.g. Nairobi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="minRepos" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Min Repos</label>
            <input
              id="minRepos"
              className="input-base"
              placeholder="e.g. 50"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary" disabled={loading}>Search</button>
          <button
            type="button"
            onClick={() => {
              setUsername('');
              setLocation('');
              setMinRepos('');
              setResults([]);
              setRawItems([]);
              setTotal(0);
              setPage(1);
              setError(null);
              setInitialSearchDone(false);
              setExactUser(null);
            }}
            className="btn-secondary"
            disabled={loading}
          >
            Reset
          </button>
          {loading && <span className="text-sm text-neutral-600 dark:text-neutral-300">Loading...</span>}
        </div>
      </form>

      {error && !loading && (
        <p className="text-red-600 dark:text-red-400 mb-4">Looks like we cant find the user</p>
      )}

      {!error && initialSearchDone && results.length === 0 && !loading && (
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">No results yet. Try different criteria.</p>
      )}

      <div className="space-y-4">
        {exactUser && (
          <div className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <img
              src={exactUser.avatar_url}
              alt={`${exactUser.login} avatar`}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{exactUser.name || exactUser.login}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 truncate">@{exactUser.login} (Exact match)</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                {exactUser.location && <span>📍 {exactUser.location}</span>}
                <span>📦 {exactUser.public_repos} repos</span>
                {exactUser.company && <span>🏢 {exactUser.company}</span>}
              </div>
              <a
                href={exactUser.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 hover:text-brand-700 text-sm mt-2 inline-block"
              >
                View Profile →
              </a>
            </div>
          </div>
        )}
        {results.map((u) => (
          <div key={u.login} className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <img
              src={u.avatar_url}
              alt={`${u.login} avatar`}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{u.name || u.login}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 truncate">@{u.login}</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                {u.location && <span>📍 {u.location}</span>}
                <span>📦 {u.public_repos} repos</span>
                {u.company && <span>🏢 {u.company}</span>}
              </div>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 hover:text-brand-700 text-sm mt-2 inline-block"
              >
                View Profile →
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && !error && (
        <div className="mt-6 flex justify-center">
          <button onClick={handleLoadMore} className="btn-primary" disabled={loading}>Load More</button>
        </div>
      )}
    </div>
  );
}
