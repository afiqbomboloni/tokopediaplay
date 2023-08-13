
module.exports = app => {
    const videos = require("../controllers/video.controller");
    const products = require('../controllers/product.controller');
    const comments = require('../controllers/comment.controller');
    const auth = require('../controllers/auth.controller');
    const isLoggedIn = require('../middlewares/auth.middleware');

    let router = require("express").Router();

    router.post('/register', auth.register);

    router.post('/login', auth.login);

    router.get("/channels", videos.findAll);

    router.get("/video/:id", videos.findOne);

    router.get('/channel', products.productList);

    router.get('/channels/comments', comments.commentList);

    router.post('/channels/comments', comments.submitComment);

    router.get('/search', products.searchProductByTitle);

    router.use((req, res, next) => {
        res.status(404).json({ message: 'Not Found' });
      });

    app.use('/api/v1', router);
}