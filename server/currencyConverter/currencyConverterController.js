var currencyConverterModel = require('./currencyConverterModel.js');

/**
 * currencyConverterController.js
 *
 * @description :: Server-side logic for managing currencyConverters.
 */

module.exports = {

    /**
     * currencyConverterController.list()
     */
    list: function (req, res) {
        currencyConverterModel.find(function (err, currencyConverters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currencyConverter.',
                    error: err
                });
            }
            return res.json(currencyConverters);
        });
    },

    /**
     * currencyConverterController.show()
     */
    show: function (req, res) {

        currencyConverterModel.findOne({ from: req.params.from, inputAmount:req.params.inputAmount,
        to:req.params.to
        }, function (err, currencyConverter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currencyConverter.',
                    error: err
                });
            }
            if (!currencyConverter) {
                return res.status(404).json({
                    message: 'No such currencyConverter'
                });
            }
            return res.json(currencyConverter);
        });
    },

    /**
     * currencyConverterController.create()
     */
    create: function (req, res) {
        
        var currencyConverter = new currencyConverterModel({
            date: "June 25, 2020",
            from: req.body.from,
            to: req.body.to,
            inputAmount: req.body.inputAmount,
            output: req.body.output

        });

        currencyConverter.save(function (err, currencyConverter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating currencyConverter',
                    error: err
                });
            }
            return res.status(201).json(currencyConverter);
        });
    },

    /**
     * currencyConverterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        currencyConverterModel.findOne({ _id: id }, function (err, currencyConverter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currencyConverter',
                    error: err
                });
            }
            if (!currencyConverter) {
                return res.status(404).json({
                    message: 'No such currencyConverter'
                });
            }

            currencyConverter.date = req.body.date ? req.body.date : currencyConverter.date;
            currencyConverter.from = req.body.from ? req.body.from : currencyConverter.from;
            currencyConverter.to = req.body.to ? req.body.to : currencyConverter.to;
            currencyConverter.inputAmount = req.body.inputAmount ? req.body.inputAmount : currencyConverter.inputAmount;
            currencyConverter.output = req.body.output ? req.body.output : currencyConverter.output;

            currencyConverter.save(function (err, currencyConverter) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating currencyConverter.',
                        error: err
                    });
                }

                return res.json(currencyConverter);
            });
        });
    },

    /**
     * currencyConverterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        currencyConverterModel.findByIdAndRemove(id, function (err, currencyConverter) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the currencyConverter.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
