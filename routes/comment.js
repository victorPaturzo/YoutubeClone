const { productSchema } = require('../../../Assignments_UserStories/MongooseTutorial/models/product');
const{Reply, validate}=require('../models/comment');
const{Comment, validate}=require('../models/comment');
const router=express.Router();

router.get('/', async (req,res)=>{
    try {
        const comments= await Comment.find();
        return res.send(comments);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            replies: req.body.replies,
        });

        await comment.save();

        return res.send(comment);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.put('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const comment = await comment.findByIdAndUpdate(
            req.params.id,
            {
                likes: req.body.likes,
                dislikes: req.body.dislikes,
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

router.post('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
               text: req.body.text,
               likes: req.body.likes,
               dislikes: req.body.dislikes, 
            },
            { new: true }
        );

        if (!comment)
            return res.status(400).send(`The comment requested does not exist.`);

        await comment.save();

        return res.send(comment);
    } catch (ex)  {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports=router;