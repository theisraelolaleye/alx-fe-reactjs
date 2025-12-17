import { useQuery } from "@tanstack/react-query";

function fetchPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    });
}

export default function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // cache fresh for 1 minute
  });

  if (isLoading) {
    return <div>Loading posts…</div>;
  }

  if (isError) {
    return <div>Error loading posts: {error.message}</div>;
  }

  const lastUpdated =
    dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h2 style={{ margin: 0 }}>Posts</h2>
        {isFetching && <span style={{ fontSize: 12 }}>(updating…)</span>}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{ marginLeft: "auto" }}
        >
          {isFetching ? "Refreshing…" : "Refetch"}
        </button>
      </div>
      {lastUpdated && (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          Last updated: {lastUpdated}
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
        {data.slice(0, 20).map((post) => (
          <li
            key={post.id}
            style={{
              padding: "10px 12px",
              marginBottom: 10,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{post.title}</div>
            <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.4 }}>
              {post.body}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}