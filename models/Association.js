// import Comment from '../models/Comment'
// import User from '../models/User'
// import Post from '../models/Post'

const User = require('./user');
const Post = require('./post')
const Comment = require('./Comment')

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });
  User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

//   export {Post, User, Comment}

module.exports = { User, Post, Comment };