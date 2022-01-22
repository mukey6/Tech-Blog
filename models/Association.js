// import Comment from '../models/Comment'
// import User from '../models/User'
// import Post from '../models/Post'

const User = require('./user');
const Post = require('./post')
const Comment = require('./Comment')

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    constraints:false
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'id',
    onDelete: 'CASCADE'

  });
  User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

  });

//   export {Post, User, Comment}

module.exports = { User, Post, Comment };