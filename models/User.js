const { Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
            type: Schema.type.ObjectId,
            ref: 'Thought'
         },
        ],
        friends: [
            {
                type: Schema.type.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtuals('friendsCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;