import React, { useCallback, useState } from "react";
import CreatePost from "./CreatePost";
import { getReplies } from "../apis/index";

function SingleComment({ comment }) {
  const [comments, setcomments] = useState();
  const onLoadMore = useCallback(async () => {
    const result = await getReplies(comment.id);
    setcomments(result);
  }, [comment.id]);

  return (
    <div style={{ paddinLeft: 5 }}>
      {comment.content}
      <CreatePost mode="comment" postId={comment.id} />
      <button onClick={onLoadMore}>Load Replies</button>
      {comments?.length && <Comments postId={comment.id} comments={comments} />}
    </div>
  );
}

function Comments({ postId, comments }) {
  return (
    <div style={{ padding: 10, border: "1px solid black" }}>
      <div>
        <b>Comments</b>
      </div>
      <strong>Put your Comments</strong>
      <CreatePost mode="comment" postId={postId} />
      {comments?.map((c) => (
        <SingleComment comment={c} />
      ))}
    </div>
  );
}

export default Comments;
