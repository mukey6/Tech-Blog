const router = require("express").Router();
const { Post, User, Comment } = require("../../models/Association");

router.get('/', (req, res)=>{
    Comment.findAll({
        attributes:['id', 'comment_text', 'created_at']
    }).then((commentData)=>{
        res.json(commentData)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

router.post('/', (req, res)=>{
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }).then((commentData)=>{
            res.json(commentData)
        }).catch((err)=>{
            res.status(500).json(err)
        })
    }
})

router.get('/:id', (req, res)=>{
    Comment.destroy({
        where:{
            id:req.body.id
        }
    }).then((commentData)=>{
        if(!commentData){
            res.status(404).json({message:"no comment has been found with this id"})
            return;
        }
        res.json(commentData)
    }).catch((err) => {
        res.status(500).json(err)
    })
    
})
module.exports=router