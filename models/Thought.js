const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format("MMM DD, YYYY [at] hh:mm a"),
        },
        userName: {
            type: String,
            required: true,
        },
        reactionSchema: 
            [reactionSchema],       
    }, 
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

model.exports = Thought;