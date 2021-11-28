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


module.exports=router;