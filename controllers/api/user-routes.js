const router = require("express").Router();
const { Post, User, Comment } = require("../../models/Association");


router.get('/', (req, res)=>{
    User.findAll({

    }).then((userData)=>{
        res.json(userData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})


router.get("//:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
      },
    ],
  }) .then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  module.exports=router