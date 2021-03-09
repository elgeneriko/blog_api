const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }

});

app.patch('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);

    } catch (e) {
        res.status(500).send(e);
    }

});



app.get('/users/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);

    }

});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(error);
    }
});



//posts

app.get('/posts/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const post = await Post.findById({ _id });
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }

});

app.patch('/posts/:id', async(req, res) => {
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


app.get('/posts', async(req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/post', async(req, res) => {
    const post = new Post(req.body);

    try {
        await post.save();
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send(e);
    }

});

app.delete('/posts/:id', async(req, res) => {
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


app.listen(port, () => {
    console.log('Server active on port 3000');
});