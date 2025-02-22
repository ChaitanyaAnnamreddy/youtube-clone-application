import { AiOutlineSend } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../utils/store/LiveChatSlice'
import { generateRandomChatMessage } from '../../utils/helper'
import EmojiPicker from 'emoji-picker-react'

const LiveChat = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.liveChat.messages)
  const chatContainerRef = useRef(null) // Ref for auto-scrolling
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessage(generateRandomChatMessage()))
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    dispatch(
      addMessage({ type: 'Sender', message: newMessage, name: 'Chaitanya' })
    )
    setNewMessage('')
  }

  const renderMessage = (message) => (
    <div
      className={`flex items-center p-2 my-1 ${
        message.type === 'Sender' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.type === 'Receiver' && (
        <>
          <img
            src="https://yt4.ggpht.com/ytc/AIdro_miv-yl0GIXfgcgPq4b7JL572OZmTYaKFB8M4e2dzw=s64-c-k-c0x00ffffff-no-rj"
            alt="Avatar"
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
          <p className="text-md text-gray-400 mr-2 font-bold">{message.name}</p>
          <div className="p-2 rounded-lg bg-gray-200 text-black">
            {message.message}
          </div>
        </>
      )}

      {message.type === 'Sender' && (
        <>
          <div className="p-2 rounded-lg bg-sky-700 text-white mb-1 mr-2">
            {message.message}
          </div>
          <p className="text-md text-gray-400 font-bold">{message.name}</p>
          <img
            src="https://yt4.ggpht.com/ytc/AIdro_lr2YRGxPaLwi_AslnVpf2OHnD0SemofC3TRkQfgvY=s64-c-k-c0x00ffffff-no-rj"
            alt="Avatar"
            className="w-8 h-8 object-cover rounded-full ml-2"
          />
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Chat Header */}
      <div className="p-3 hsla(0, 0%, 100%, 0.08) text-white border border-t-teal-900 border-l-teal-900 border-r-teal-900 border-b-transparent rounded-t-lg flex justify-between items-center w-[400px] ml-[14px]">
        <p className="text-lg font-semibold">Live Chat</p>
      </div>

      {/* Chat Messages (Reversed) */}
      <div
        ref={chatContainerRef}
        className="hsla(0, 0%, 100%, 0.08) text-white mb-2 border border-teal-900 rounded-b-lg p-4 ml-[14px] w-[400px] h-[500px] flex flex-col-reverse overflow-y-auto"
      >
        <form
          className="flex items-center w-full mt-2 relative "
          onSubmit={handleSendMessage}
        >
          <div className="flex items-center border border-gray-400 rounded-3xl w-full bg-black px-2">
            <input
              type="text"
              placeholder="Chat..."
              className="flex-1 bg-transparent text-white p-2 focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="button"
              className="p-2 rounded-3xl "
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😀
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-3xl ml-2 flex items-center"
          >
            <AiOutlineSend />
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              className="absolute bottom-12 left-0 shadow-md z-10"
              style={{ transform: 'scale(0.8)', width: '200px' }}
            >
              <EmojiPicker
                onEmojiClick={(emojiObject) => {
                  setNewMessage((prev) => prev + emojiObject.emoji)
                  setShowEmojiPicker(false)
                }}
              />
            </div>
          )}
        </form>

        {messages
          .slice()
          .reverse()
          .map((message, index) => (
            <div key={index}>{renderMessage(message)}</div>
          ))}
      </div>

      {/* Chat Input */}
    </>
  )
}

export default LiveChat
