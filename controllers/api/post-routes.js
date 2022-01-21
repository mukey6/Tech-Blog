const router = require("express").Router();
const { Post, User, Comment } = require("../../models/Association");
const autherized = require('../../utils/autherize')


router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", 'created_at'],
    include: [
      {
        model: User,
        attributes: ["username"],
      }, 
      {
        model:Comment,
        attributes:['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include:{
          model:User,
          attributes:['username']
        }
      }
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Post.findOne({
        where:{
            id:req.params.id
        }
    }).then((postData)=>{
        if(!postData){
            res.status(404).json({message:'No id found'});
            return
        }
        res.json(postData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
});

router.post('/',autherized,(req,res)=>{
    Post.create({
        title:req.body.title,
        post_text:req.body.post_text,
        user_id:req.session.user_id
    }).then((postData)=>{
        res.json(postData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

router.put("/:id",autherized, (req, res) => {
    Post.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete("/:id",autherized,(req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
module.exports = router;
