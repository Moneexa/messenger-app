var ChatModel = require('./chat.model.js');
var UserModel = require('../user/userModel');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    create,
    listRooms,
    getChat
}




async function create(req, res) {

    try {
        const { initiator, receiver, initialChat } = req.body;
        console.log({ initiator, receiver, initialChat })


        let existingChat = await ChatModel.findOne({ initiator: initiator, receiver: receiver });
        if (existingChat) {
            return res.status(200).send(existingChat);
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
async function getChat(req, res) {
    let chat = await ChatModel.findOne({
        '$or': [
            { initiator: req.params.userName, receiver: req.params.receiver }, {
                receiver: req.params.userName, initiator: req.params.receiver
            }
        ]

    })
    if (!chat) {
        
        chat = new ChatModel({
            initiator: req.params.userName, 
            receiver: req.params.receiver,
            texts: []
        });

        await chat.save();
    }
    return res.json(chat);
}
async function listRooms(req, res) {
    const room = await ChatModel.find({
        '$or': [
            { initiator: req.params.userName }, {
                receiver: req.params.userName
            }
        ]
    }).populate("initiator receiver")


    return res.json(room);

}