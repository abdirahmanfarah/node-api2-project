const express = require('express');

const Hubs = require('../data/db.js');

const router = express.Router();


router.get('/', (req, res) => {
  Hubs.find()
    .then(hubs => {
      console.log('Hubs', hubs);
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "We can't get any posts"
      });
    });
});

router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
    .then(hub => {
      if(hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.post('/', (req, res) => {
  // const postData = req.body;

  Hubs.insert(req.body)
    .then(hub => {
      if(hub) {
         res.status(201).json(hub)
      } else {
        res.status(404).json({ message: 'Please provide title and content for the post'})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error adding post"})
    });
});

router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: "Post deleted"})
      }else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error removing the post' })
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then(hub => {
      if(hub) {
        res.status(200).json(hub);
      }else {
        res.status(404).json({ message: "The post could not be found", })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updaing the post"
      });
    });
});

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


module.exports = router;