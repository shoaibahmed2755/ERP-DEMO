'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css' // Or any other highlight.js theme

type ChatMessage = {
  role: 'user' | 'ai'
  text: string
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hello! How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  async function sendMessage(message: string) {
    setMessages(prev => [...prev, { role: 'user', text: message }])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', text: `❌ ${data.error}` }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Error: Failed to get response.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat Assistant 🤖</h1>

      <div
        className="h-96 overflow-y-auto bg-white rounded border p-4 space-y-3"
        ref={chatRef}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-md w-fit max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-auto text-right'
                : 'bg-gray-100'
            }`}
          >
            <div className="text-sm font-medium text-gray-700">
              {msg.role === 'user' ? 'You' : 'AI'}:
            </div>
            <div className="text-base">
              {msg.role === 'ai' ? (
                <div className="prose prose-sm dark:prose-invert">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 italic">AI is thinking...</div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && !loading) sendMessage(input.trim())
        }}
        className="mt-4 flex space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`px-4 py-2 rounded text-white ${
            loading || !input.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
