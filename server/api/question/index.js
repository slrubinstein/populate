'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/comment', controller.addComment);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;