// import express, { Router } from "express";
// import { Post, User, Comment } from "../models";
// import { Sequelize } from "../config/connection";
// let router = express.Router();

const router = require("express").Router();
const { Post, User, Comment } = require("../models/Association");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
          model: Comment,
          attributes:['id','comment_text', 'user_id', 'post_id','created_at']
      }
    ],
  }).then((postData)=>{
      res.json(postData)
  }).catch((err)=>{
    res.status(500).json(err);
  })
});

router.get('/:id', (req,res)=>{
  Post.findOne({
    where:{
      where:{
        id:req.params.id
      },
      attributes: ["id", "title", "post_text"],
      include:[
        {
          model: User,
          attributes: ["username"],
        },
        {
            model: Comment,
            attributes:['id','comment_text', 'user_id', 'post_id','created_at']
        }
      ]
    }
  })
})

module.exports=router