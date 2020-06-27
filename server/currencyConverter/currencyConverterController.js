var currencyConverterModel = require('./currencyConverterModel.js');

/**
 * currencyConverterController.js
 *
 * @description :: Server-side logic for managing currencyConverters.
 */
function converter(from, input, to) {
    const from = from;
    const input = input;
    const output = "";
    const to = to;
    const eur_usd = 1.12, eur_chf = 1.06, chf_usd = 1.05;
    if (from === "EUR" && to === "USD") {
        output = input * eur_usd;
    }
    else if (from === "USD" && to === "EUR") {
        output = input / eur_usd;
    }
    else if (from === "EUR" && to === "CHF") {
        output = input * eur_chf;
    }
    else if (from === "CHF" && to === "EUR") {
        output = input / eur_chf;
    }
    else if (from === "CHF" && to === "USD") {
        output = input * chf_usd;
    }
    else if (from === "USD" && to === "CHF") {
        output = input / chf_usd;
    }
    else {
        output = ""
    }
    return output;
}
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
        const outputValue = converter(req.body.from, req.body.inputAmount, req.body.to);
        var currencyConverter = new currencyConverterModel({
            date: req.body.date,
            from: req.body.from,
            to: req.body.to,
            inputAmount: req.body.inputAmount,
            output: outputValue

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
