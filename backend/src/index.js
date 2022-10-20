const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

const PostController = require("./routes/postsController");
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/posts", PostController.getAll);
app.post("/posts", PostController.createPost);
app.get("/posts/replies", PostController.getReplies);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
