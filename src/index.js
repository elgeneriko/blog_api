const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    console.log(user);

    user.save().
    then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });

    //res.send(user);
})

app.post('/post', (req, res) => {
    const post = new Post(req.body);
    console.log(post);

    post.save().
    then(() => {
        res.status(201).send(post);
    }).catch((error) => {
        res.status(400).send(error);
    });

    //res.send(user);
})

app.listen(port, () => {
    console.log('Server active on port 3000');
});