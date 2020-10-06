var ChatModel = require('./chat.model.js');
var UserModel = require('../user/userModel');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    create,
    listMessages
}




async function create(req, res) {

    try {
        const { initiator, receiver, initialChat } = req.body;
        console.log({ initiator, receiver, initialChat })


        let existingChat = await ChatModel.findOne({ initiator: initiator, receiver: receiver });
        if (existingChat) {
            return res.status(400).send('Chat already exists you cannot create again');
        }
        const sender = await UserModel.findOne({ _id: initiator })
        const recipient = await UserModel.findOne({ _id: receiver })
        if (sender && recipient) {
            console.log(sender.userName, recipient.userName)
            var chat = new ChatModel({
                initiator: initiator,
                receiver: receiver,
                texts: [{
                    date: new Date(),
                    recipient: recipient.userName,
                    sender: sender.userName,
                    value: initialChat
                }]
            });

            await chat.save();
        }
        return res.status(201).send(chat);
    }
    catch (error) {
        return res.status(500).send({
            message: 'Error when creating chat',
            error: error
        });
    }
}

async function listMessages(req, res) {
    ChatModel.findOne({ _id: req.params.id }, function (err, chat) {
        if (err || !chat) {
            return res.status(500).json({
                message: 'Error when getting campaign.',
                error: err
            });
        }
        return res.json(chat.texts);
    });
}