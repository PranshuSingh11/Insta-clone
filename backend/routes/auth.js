const router = require("express").Router();
const { findOne } = require("../models/User");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken');
const Post = require("../models/Post");


router.get("/",verify,async (req,res)=>{


  try {
    const userinfo = await  User.findOne({_id:req.user})
    res.json(userinfo)
  } catch (error) {
    res.json({message:error})
  }
})


router.get("/:id",verify, (req,res)=>{


  try {
    User.findOne({_id:req.params.id})
    .then(user=>{
      Post.find({postedBy:req.params.id})
      .populate("postedBy","_id name")
      .exec((err,posts)=>{
        if(err)
          return res.status(400).json({error:err})
        res.json({user,posts})
      })
    })
  } catch (error) {
    res.json({message:error})
  }
})


router.post("/register" ,async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password,salt)
  // const hashedPassword = passwordHash.generate(req.body.password);


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }

});

router.post("/login", async (req, res) => {


  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const  token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
  const {_id,name,following} = user
  res.header('auth-token',token).send({token,user:_id,name,following})

  res.send("Logged in");
});


router.put('/follow',verify,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
    $addToSet:{followers:req.user._id}
  },{
    new:true
  },(err,result)=>{
    if(err)
      return res.status(400).json({error:err})
    User.findByIdAndUpdate(req.user._id,{
      $addToSet:{following:req.body.followId}
    },{
      new:true
    }).then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(400).json({error:err})
    })
  })
})


router.put('/unfollow',verify,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
    $pull:{followers:req.user._id}
  },{
    new:true
  },(err,result)=>{
    if(err)
      return res.status(400).json({error:err})
    User.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.body.followId}
    },{
      new:true
    }).then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(400).json({error:err})
    })
  })
})

module.exports = router;
