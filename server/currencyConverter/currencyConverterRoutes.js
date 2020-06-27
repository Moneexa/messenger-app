var express = require('express');
var router = express.Router();
var currencyConverterController = require('./currencyConverterController.js');

/*
 * GET
 */
router.get('/', currencyConverterController.list);

/*
 * GET
 */
router.get('/:id', currencyConverterController.show);

/*
 * POST
 */
router.post('/', currencyConverterController.create);

/*
 * PUT
 */
router.put('/:id', currencyConverterController.update);

/*
 * DELETE
 */
router.delete('/:id', currencyConverterController.remove);

module.exports = router;
