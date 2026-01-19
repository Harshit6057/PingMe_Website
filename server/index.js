import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'PingMe API', uptime: process.uptime() })
})

app.get('/api/highlights', (_, res) => {
  res.json({
    stats: [
      { label: 'Live scans every day', value: '42K+' },
      { label: 'Average redirect speed', value: '1.2s' },
      { label: 'Design combos shipped', value: '1200+' }
    ],
    collections: [
      { label: 'Signature Series', price: '₹1,499' },
      { label: 'NightRide Pack', price: '₹1,199' },
      { label: 'Pro Teams Suite', price: 'Talk to sales' }
    ]
  })
})

app.post('/api/contact', (req, res) => {
  const { name, email, project } = req.body || {}

  if (!name || !email || !project) {
    return res.status(400).json({ error: 'Please include name, email, and project details.' })
  }

  return res.status(201).json({
    message: 'Ping received. Our team will reach out within 24 hours.',
    receivedAt: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`PingMe server running on http://localhost:${PORT}`)
})