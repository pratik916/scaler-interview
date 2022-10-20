import React, { useEffect, useState } from "react";
import { getAllPosts } from "../apis/index";
import Post from "./Post";

function ListPosts({ onCreated, onCreate }) {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await getAllPosts();
        setposts(result);
      } catch (error) {}
    };
    getPosts();
    return () => {
      setposts([]);
    };
  }, [onCreated]);

  return (
    <div>
      Posts
      {posts.map((p) => (
        <Post key={p.id} post={p} onCreate={onCreate} />
      ))}
    </div>
  );
}

export default ListPosts;
