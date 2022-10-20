import React, { useCallback, useRef } from "react";
import { createPost } from "../apis/index";

function CreatePost({ postId, onCreate, mode }) {
  const inputRef = useRef(null);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const content = inputRef.current.value;
      await createPost({
        content,
        user_id: 1,
        parent_id: postId,
      });
      inputRef.current.value = "";
      onCreate?.();
      // TODO: post call to the create post
    },
    [onCreate, postId],
  );

  return (
    <form onSubmit={handleSubmit}>
      {mode === "comment" ? null : (
        <>
          <legend>Post Something</legend>
          <label>Content</label>
        </>
      )}
      <input ref={inputRef} />
      <button type="submit">{mode === "comment" ? "Reply" : "Submit"}</button>
    </form>
  );
}

export default CreatePost;
