const mongoose = require('mongoose');
const Joi=require('joi');

const replySchema= new mongoose.Schema(
    {
        text:{type: String, required: true},
        likes:{type: Number, default:0},
        dislikes:{type: Number, default: 0},
    }
)

const commentSchema= new mongoose.Schema(
    {
        videoId:{type: String, required: true},
        text:{type: String, required: true},
        likes:{type: Number, default:0},
        dislikes:{type: Number, default: 0},
        replies:{type: [replySchema],default: []}
    }
)

function validateComment(comment){
    const schema=Joi.object({
        videoId: Joi.string().min(2).max(50).required(),
        text: Joi.string().required(),
        likes: Joi.number().required(),
        dislikes:Joi.number().required(),

    });
    return schema.validate(comment);
}

const Comment = mongoose.model('Comment',commentSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports.Reply=Reply;
exports.validate=validateComment;
module.exports.Comment=Comment;
