const { QueryTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const PostController = {
  async getAll(req, res) {
    try {
      //   const posts = await models.Post.findAll({
      //     // include: ["Comments"],
      //   });
      const posts = await sequelize.query(
        "SELECT * FROM `Posts` where parent_id is NULL",
        {
          type: QueryTypes.SELECT,
        },
      );

      const comments = await sequelize.query(
        `SELECT * FROM \`Posts\` where parent_id IN (${posts
          .map((p) => p.id)
          .join(",")})`,
        {
          type: QueryTypes.SELECT,
        },
      );

      posts.forEach((p) => {
        p.comments = comments.filter((c) => c.parent_id == p.id);
      });

      console.log({ posts, comments });
      //   res.send(posts);
      res.statusCode = 200;
      res.json(posts);
    } catch (error) {
      res.statusCode = 400;
      res.json({ error: error.message });
    }
  },

  async getReplies(req, res) {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error("id is required");
      }

      //   const posts = await sequelize.query(
      //     `SELECT * FROM \`Posts\` where id = ${id}`,
      //     {
      //       type: QueryTypes.SELECT,
      //     },
      //   );

      const comments = await sequelize.query(
        `SELECT * FROM \`Posts\` where parent_id = ${id} `,
        {
          type: QueryTypes.SELECT,
        },
      );

      console.log({ comments });
      res.statusCode = 200;
      res.json(comments);
    } catch (error) {
      res.statusCode = 400;
      res.json({ error: error.message });
    }
  },

  async createPost(req, res) {
    try {
      console.log(req.body);
      const { content, user_id, parent_id } = req.body;
      if (!content || !user_id) {
        throw new Error(`content and user required `);
      }
      const post = await sequelize.models.Post.create({
        content,
        user_id,
        parent_id,
      });
      res.statusCode = 200;
      res.json(post);
    } catch (error) {
      res.statusCode = 400;
      res.json({ error: error.message });
    }
  },
};

module.exports = PostController;
