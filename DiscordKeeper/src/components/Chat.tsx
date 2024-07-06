import React from 'react'

const Chat = () => {
    return (
            <div className="flex flex-col h-4/5">
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://www.mydevify.com/icon.png" />
                            </div>
                        </div>
                        <div className="chat-header">
                            Obi-Wan Kenobi
                            <time className="text-xs opacity-50">12:45</time>
                        </div>
                        <div className="chat-bubble">You were the Chosen One!</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://www.mydevify.com/icon.png" />
                            </div>
                        </div>
                        <div className="chat-header">
                            xLoy
                            <time className="text-xs opacity-50">12:46</time>
                        </div>
                        <div className="chat-bubble">test test aywa aywa</div>
                        <div className="chat-footer opacity-50">Seen at 12:46</div>
                    </div>


                </div>
                <div className=" bottom-0 left-0 w-full p-4  border-t">
                    <div className="flex">
                        <input type="text" placeholder="Type a message" className="input input-bordered w-full mr-2" />
                        <button className="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>

    )
}

export default Chat