import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { messages, system } = req.body
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      messages,
    })
    res.json({ content: response.content[0].text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: err.message })
  }
}
