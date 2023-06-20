const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction')
const dayjs = require('dayjs');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 180,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: () => dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],  
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);


module.exports = Thought;
