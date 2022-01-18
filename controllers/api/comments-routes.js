const router = require("express").Router();
const { Post, User, Comment } = require("../../models/Association");
const { findAll } = require("../../models/user");

router.get('/', (req, res)=>{
    Comment.findAll({
        attributes:['id', 'comment_text', 'created_at']
    })
})