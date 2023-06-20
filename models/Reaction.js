const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

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
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


module.exports = { reactionSchema };
