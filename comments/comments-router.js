const express = require('express');

const Comment = require('../data/db');

// const commentRouter = require('../comments/comments-router');


const router = express.Router();


router.get('/:id/comments', (req, res) => {
  Hubs.findCommentById(req.params.id)
    .then(hub => {
      res.status(200).json(hub);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the comment"})
    });
});

router.post('/:id/comments', (req, res) => {
  Hubs.insertComment(req.body)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Can't make post to comment"})
    });
});

module.exports = router;