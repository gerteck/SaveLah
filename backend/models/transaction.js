const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

exports.Transaction = mongoose.model('Transaction', transactionSchema);