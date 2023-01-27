const { Post } = require("../models/post.model")

const addPostControl = async(req,res)=>{
    console.log(req.body)
    const {name,picture,title,desc} = req.body
    const post = new Post({name,picture,title,desc})
    await post.save()
    res.send("success")
}
const getPostControl = async (req,res)=>{
    const posts =await Post.find()
    res.send(posts)
}

module.exports = {addPostControl,getPostControl}