import { useQuery } from "@tanstack/react-query";

function fetchTodos() {
  return fetch("https://jsonplaceholder.typicode.com/todos")
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
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // cache fresh for 1 minute
  });

  if (isLoading) {
    return <div>Loading todos…</div>;
  }

  if (isError) {
    return <div>Error loading todos: {error.message}</div>;
  }

  const lastUpdated =
    dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h2 style={{ margin: 0 }}>Todos</h2>
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
        {data.slice(0, 20).map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "8px 12px",
              marginBottom: 8,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{todo.title}</span>
            <span
              style={{
                fontSize: 12,
                padding: "2px 6px",
                borderRadius: 4,
                background: todo.completed ? "#dcfce7" : "#fee2e2",
                color: todo.completed ? "#166534" : "#991b1b",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}