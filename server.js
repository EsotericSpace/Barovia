import express from 'express'
import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

const app = express()
app.use(express.json({ limit: '2mb' }))

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages,
    })
    const { usage } = response
    console.log(`tokens — in: ${usage.input_tokens}, out: ${usage.output_tokens}, cache_write: ${usage.cache_creation_input_tokens ?? 0}, cache_hit: ${usage.cache_read_input_tokens ?? 0}`)
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`DM server on http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY not set in .env')
  }
})
