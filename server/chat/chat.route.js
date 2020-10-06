var express = require('express');
var router = express.Router();
var chatController = require('./chat.controller');
/*
 * POST
 */
router.post('/',  chatController.create);
router.get('/:id',chatController.listMessages);

/*
 * PUT
 */
// router.put('/:id', chatController.update);

/*
 * DELETE
 */
// router.delete('/:id', chatController.remove);
module.exports = router;
