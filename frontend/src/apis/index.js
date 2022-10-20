import axios from "axios";

const baseUrl = "http://localhost:3001";

export const getAllPosts = async () => {
  const result = await axios.get(baseUrl + "/posts");
  return result.data;
};

export const getReplies = async (id) => {
  const result = await axios.get(baseUrl + "/posts/replies", {
    params: { id },
  });
  return result.data;
};

export const createPost = async (data) => {
  const result = await axios.post(baseUrl + "/posts", data);
  return result.data;
};
