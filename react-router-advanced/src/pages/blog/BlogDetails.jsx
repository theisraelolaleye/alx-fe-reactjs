// src/pages/Blog/BlogPost.jsx
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Post slug: <strong>{slug}</strong></p>
    </div>
  );
};

export default BlogPost;
