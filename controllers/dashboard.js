const router = require('express').Router();
const { Post, User, Comment } = require('../models/Association');
const autherized = require('../utils/autherize')

// use the ID from the session (change body to session)
router.get('/', autherized, (req, res) => {
    Post.findAll({
      where: {
        
        user_id: req.session.user_id
      },
      attributes: ['id','title','post_text','created_at',],
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
        // serialize data before passing to template
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  


router.get('/edit/:id', autherized,(req, res) => {
    console.log("~~~~~~~~~~~~~~")
    Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'post_text',
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
        if (postData) {
          const post = postData.get({ plain: true });
          
          res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  module.exports=router