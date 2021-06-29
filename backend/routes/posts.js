const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require('multer');
const path = require('path')
const verify = require('./verifyToken')

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, './uploads');
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage:storage})

router.get("/",verify, async (req, res) => {

  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.json({message:error})
  }
});

router.get("/myposts",verify, async (req, res) => {

  try {
    const singleuserposts = await Post.find({postedBy:req.user._id})
    res.json(singleuserposts)
  } catch (error) {
    res.json({message:error})
  }
});



router.post("/",upload.single('image'),verify ,(req, res) => {
  console.log(req.file)
  const url = req.protocol + '://' + req.get('host')
  const post = new Post({
    username: req.body.username,
    caption: req.body.caption,
    image:url + '/uploads/' + req.file.filename,
    postedBy:req.user
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
