const express = require('express');

const hubsRouter = require('../posts/posts-router.js');

const commentRouter = require('../comments/comments-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2> Blog API</h2>
    <h2> Welcome to my blog!</h2>
  `)
});



server.use('/api/posts', hubsRouter, commentRouter);

// server.use('/api/posts/:id/comments', )

module.exports = server;