const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

module.exports = () => {
    router.get('/', urlController.home);
    router.post('/', urlController.shorten);

    //This is the route for the short url
    router.get('/:shorten', urlController.redirect);
    return router;
};