const  { Schema, model } = require('mongoose');

//---------------Reaction Schema

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    }
);


//------------------Though Schema 

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280, 
            minlength: 1,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
        userName: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema]

    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length; 
});

const Thought = model('thought', thoughtSchema);
module.exports = thoughtSchema;