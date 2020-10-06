import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './chatInterface.css';
import { Form } from 'react-bootstrap'
import { useStoreActions, useStoreState } from 'easy-peasy';
import './chatInterface.css';


export default function ChatInterface({ match }) {
    const login = useStoreActions(actions => actions.user.login);
    const register = useStoreActions(actions => actions.user.signup);
    const userName = match.params.userName;
    const messages = useStoreState(state => state.chat.messages);
    const [lastMessage, setLastMessage] = useState(null);
    const [conn, setConn] = useState("")
    const searchUser = useStoreActions(actions => actions.user.searchUser)
    const [message, setMessage] = useState('');
    const searchedUser = useStoreState(state => state.user.searchedUser)
    const [recipient, setRecipient] = useState("")
    const setRecipientInfo = useStoreActions(actions => actions.user.setRecipient)
    const send = useStoreActions(actions => actions.chat.send)
    const rooms = useStoreState(state => state.chat.rooms);
    const room = useStoreState(state => state.chat.activeRoom);
    const changeActiveRoom = useStoreActions(actions => actions.chat.changeActiveRoom);
    const setActiveRoom = useStoreActions(actions => actions.chat.setActiveRoom);
    const createChat = useStoreActions(actions => actions.chat.createChat)

    useEffect(() => {
        if (match.params.action === "login") {
            login(match.params.userName)
        }
        else if (match.params.action === "register") {
            register(match.params.action);
        }
    }, [])
    useEffect(() => {
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth" });
        }
    })
    useEffect(() => {
        if (room.id)
            changeActiveRoom(room)
    }, [room])

    function handleSubmit(e) {
        e.preventDefault();

        searchUser(conn)

    }
    function handleChange(e) {
        setConn(e.target.value)
    }
    function sendMessage(event) {
        event.preventDefault();
        if (message) {


            send({ id: room.id, value: message, sender: userName, recipient: recipient });

            setMessage('');

        }
    }
    function handleSearchedUserClick() {
        if (searchedUser !== "") {
            setRecipient(searchedUser)
            document.getElementById("searchedUser").innerHTML = ""
            setRecipientInfo(searchedUser);

            setConn("")

        }

    }
    function getContactName(value) {
        //console.log(value.sender)
        return value.sender

    }
    function getTitle(value) {
        return value.sender
    }

    return (<>
        <div className="h-100 w-100 position-absolute d-flex">
            <div className={`m-2 flex-grow-1 d-flex shadow-sm container}`}>
                <div className={`d-flex flex-column sidebar col-md-3`}>

                    <div className="my-1">
                        <Form onSubmit={handleSubmit} className="d-flex justify-content-center w-100 mt-3 border-radius-21">
                            <Form.Group>
                                <Form.Control type="text" value={conn} onChange={handleChange} placeholder={`Search for connection`} />

                            </Form.Group>
                        </Form>
                        <div className="d-flex justify-content-center mr-2 my-3 searchedUser">
                            <p id="searchedUser" onClick={handleSearchedUserClick}> {
                                searchedUser ? searchedUser : ''
                            } </p>
                        </div>
                    </div>
                    <div className={`flex-grow-1 rooms`}>
                        {
                            rooms.map((value, index) => {
                                return <div onClick={() => setActiveRoom(value)} key={index} className={`room ${room.id === value.id ? 'active' : ''}`}>
                                    <div className={`title`}>
                                        {getTitle(value)}
                                    </div>
                                    <div className={`subTitle`}>{value.title}</div>
                                </div>
                            })


                        }
                    </div>
                </div>
                <div className={`flex-grow-1 d-flex flex-column messagesContainer col-md-9`}>
                    <div className={`header d-flex align-items-center pl-4`}>
                        <h3 id="title">{
                            recipient ? recipient : 'Messages'
                        }</h3>
                    </div>
                    <div className={`flex-grow-1 messages`}>
                        {
                            messages.map((message, index) => (
                                <div key={index} className={`d-flex flex-column message`} ref={(el) => { setLastMessage(el); }}>

                                    <div className={`nameAndText`}>
                                        <div className={`font-weight-bold`}>{getContactName(message)}</div>
                                        <div className={`text`}>

                                            {message.text}
                                        </div>
                                    </div>
                                    {index !== (messages.length - 1) ? <div className={`borderBottom`}></div> : ''}
                                </div>
                            ))
                        }

                    </div>
                    <form className={`d-flex p-4 messageInputContainer`} onSubmit={(event) => sendMessage(event)}>
                        <input value={message} onChange={(event => setMessage(event.target.value))} className={`rounded-0 flex-grow-1 mr-2`} type="text" />
                        <button className="btn btn-success px-4">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </>)

}
