// src/pages/Blog/BlogList.jsx
import { Link } from "react-router-dom";

const BlogList = () => {
  const posts = [
    { id: 1, title: "React Basics", slug: "react-basics" },
    { id: 2, title: "Understanding React Router", slug: "react-router" },
  ];

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
