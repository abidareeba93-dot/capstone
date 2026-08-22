import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  console.log('Chat request received')

  try {
    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system:
        'You are MovieHub AI. Help users with movie and TV recommendations. Keep answers friendly and concise.',
      messages: req.body.messages,
    })

    res.setHeader('Content-Type', 'text/event-stream')
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('Connection', 'keep-alive')

    for await (const chunk of result.textStream) {
  res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`)
}
    res.end()
  } catch (error) {
    console.error('AI ERROR:', error)
    res.status(500).send('AI request failed')
  }
})

app.listen(3001, () => {
  console.log('AI server running at http://localhost:3001')
})