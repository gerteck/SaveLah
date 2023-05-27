const { Transaction } = require('../models/transaction');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const transactionList = await Transaction.find();

  if (!transactionList) {
    res.status(500).json({success: false})
  }

  res.send(transactionList);
});

router.post(`/`, async (req, res) => {
  let transaction = new Transaction({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    dateCreated: req.body.dateCreated
  })

  transaction = await transaction.save();

  if(!transaction) {
    return res.status(404).send('the transaction cannot be created');
  }

  res.send(transaction);
});

module.exports = router;
