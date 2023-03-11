const  { Schema, model } = require('mongoose');

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
        reactions: [reactionSchema] //----------- ????  Is this correct?  Where do we get this from? Virtuals?

    },
    {
    toJSON: {
        getters: true,
    },
    }
);

const Thought = model('thought', thoughtSchema);
module.exports = thoughtSchema;