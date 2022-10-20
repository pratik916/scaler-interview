import React, { useCallback } from "react";
import Comments from "./Comments";

function Post({ post, onCreate }) {
  const onLikeButtonClick = useCallback(
    (e) => {
      console.log(e, post.id);
    },
    [post.id],
  );

  return (
    <div>
      <b>{post.title}</b>
      <p>{post.content}</p>
      <button onClick={onLikeButtonClick}>Like</button>
      <Comments postId={post.id} comments={post.comments} onCreate={onCreate} />
    </div>
  );
}

export default Post;
