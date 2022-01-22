// import express, { Router } from "express";
// import { Post, User, Comment } from "../models";
// import { Sequelize } from "../config/connection";
// let router = express.Router();

const router = require("express").Router();
const { Post, User, Comment } = require("../models/Association");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", "created_at"],
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
    const posts = postData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });   }).catch((err)=>{
    res.status(500).json(err);
  })
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports=router