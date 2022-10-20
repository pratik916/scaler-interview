const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Model attributes are defined here
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
  },
);

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    parent_id: {
      type: DataTypes.INTEGER,
    },
    thread_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
  },
);

const UserLikes = sequelize.define(
  "User_Likes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    like_symbol: {
      type: DataTypes.ENUM("LIKE", "SMILE"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
  },
);

sequelize.sync({ force: true });
// User.hasMany(Post, { foreignKey: "user_id" });
// // Post.hasMany(Post, { foreignKey: "parent_id", as: "Comments" });
// Post.hasMany(UserLikes, { foreignKey: "post_id" });
// User.hasMany(UserLikes, { foreignKey: "user_id" });

// UserAccess.belongsTo(UserMaster,{foreignKey: 'userId'});
// UserMaster.hasMany(UserAccess,{foreignKey : 'userId'});
// var userData = await UserMaster.findAll({include: [UserAccess]});

module.exports = sequelize;
