import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import io from 'socket.io-client';
import { store } from '../store/store'
const socket = io(config.socketHost);
const { action, thunk } = require("easy-peasy");
export const ChatModel = {
    activeRoom: {
        id: null,
        sender: "",
        receiver: ""
    },
    messages: [], rooms: [],
    pushMessage: action((state, payload) => {
        state.messages = [...state.messages, payload];
        console.log(state.messages)
    }),
    setMessages: action((state, payload) => {
        state.messages = payload;
    }),
    setRooms: action((state, payload) => {
        state.rooms = payload;
    }),
    setActiveRoom: action((state, payload) => {
        state.activeRoom = payload;
    }),
    createChat: thunk(async (actions, payload) => {
        axios.post(`${config.apiUrl}/chats`, payload)
    }),
    send: thunk(async (actions, { id, value, sender, recipient }) => {
         socket.emit('send', {
             id,
             value,

             sender,
             recipient,
         });
        actions.pushMessage({
            sender,
            recipient,
            text:value
        })
    }),
}
socket.on('connect', () => {
    console.log("Connection joined");
    const sender = localStorage.getItem("activeSender");
    const receiver = localStorage.getItem("activeRecipient")
    socket.emit('joinRecipientRooms', { sender, receiver });

})



