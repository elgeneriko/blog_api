const express = require('express');
const Post = require('../models/post');
const router = new express.Router();

router.get('/posts/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const post = await Post.findById({ _id });
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.patch('/posts/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'content', 'author', 'date'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const post = await Post.findById(req.params.id);
        updates.forEach((update) => post[update] = req.body[update]);
        await post.save();
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/posts', async(req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/post', async(req, res) => {
    const post = new Post(req.body);

    try {
        await post.save();
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router