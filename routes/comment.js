const express = require('express');
const{Reply, Comment, validateComment}=require('../models/comment');
const router=express.Router();

router.get('/:videoId', async (req,res)=>{
    try {
        const comments= await Comment.find();
        return res.send(comments);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text,
        });

        await comment.save();

        return res.send(comment);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.put('/:commentId', async (req, res) => {
    try {

        const comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                ...req.body
            },
            { new: true}
        );
        
        if (!comment)
            return res.status(400).send(`The comment requested does not exist.`)

        await comment.save();

        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.post('/:commentId/replies', async (req, res) => {
    try {
        // Query and get the specific object from the DB
        const comment = await Comment.findById(req.params.commentId);

        const reply = new Reply({
           text: req.body.text,
           likes: req.body.likes,
           dislikes: req.body.dislikes,
        });
         // Push the new rply object into the comment's replies array    
        comment.replies.push(reply);
       
        
        
        // save the comment object
        await comment.save();

        // send back the comment
        return res.send(comment.replies);
    } catch (ex)  {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports=router;