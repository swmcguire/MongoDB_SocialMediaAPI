const  { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true, 
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Please enter a valid email'
            } 
        },
        thoughts: [thoughtSchema], //-------------- ????  Is this right?
        friends: [], //----------------------------- ????? Is this right? 
    },
    {toJSON: {
        getters: true,
    },
    id: false,
}
);

const User = model('user', userSchema);

module.exports = User;