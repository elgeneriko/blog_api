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
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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