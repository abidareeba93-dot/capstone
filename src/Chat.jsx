import { useEffect, useRef, useState } from 'react'

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')

  const abortController = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (event) => {
    event.preventDefault()

    const text = input.trim()

    if (!text || isStreaming) return

    setInput('')
    setError('')
    setIsStreaming(true)

    const userMessage = {
      role: 'user',
      content: text,
    }

    const assistantMessage = {
      role: 'assistant',
      content: '',
    }

    const updatedMessages = [...messages, userMessage]

    setMessages([...updatedMessages, assistantMessage])

    const controller = new AbortController()
    abortController.current = controller

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let assistantText = ''

      while (true) {
        const { value, done } = await reader.read()

        if (done) break

        assistantText += decoder.decode(value, {
          stream: true,
        })

        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content: assistantText,
          },
        ])
      }

      assistantText += decoder.decode()

      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: assistantText,
        },
      ])
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('CHAT ERROR:', err)
        setError('Could not connect to MovieHub AI.')
      }
    } finally {
      setIsStreaming(false)
      abortController.current = null
    }
  }

  const stopGeneration = () => {
    abortController.current?.abort()
    setIsStreaming(false)
  }

  return (
    <section className="chat-section">
      <div className="chat-header">
        <h2>🤖 MovieHub AI</h2>
        <p>Ask me about movies and series.</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <span>🎬</span>
            <h3>What should I watch?</h3>
            <p>Try asking: "Recommend me a sci-fi movie."</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.role}`}
            key={`${message.role}-${index}`}
          >
            <strong>
              {message.role === 'user' ? 'You' : 'MovieHub AI'}
            </strong>

            {message.content ? (
              <p>{message.content}</p>
            ) : (
              message.role === 'assistant' &&
              isStreaming &&
              index === messages.length - 1 && (
                <div className="thinking">
                  <span />
                  <span />
                  <span />
                </div>
              )
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {error && <p className="chat-error">{error}</p>}

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about a movie..."
          disabled={isStreaming}
        />

        {isStreaming ? (
          <button type="button" onClick={stopGeneration}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>
    </section>
  )
}

export default Chat