import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
const mongoDbName = process.env.MONGO_DB_NAME || 'pingme'

let client
let database

app.use(cors())
app.use(express.json())

const normalizeEmail = (email = '') => email.trim().toLowerCase()

const buildWorkspaceSlug = (workspace = '') =>
  workspace
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `workspace-${Date.now()}`

const ensureDb = () => {
  if (!database) {
    throw new Error('Database not initialised yet. Wait for Mongo connection.')
  }

  return database
}

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'PingMe API', uptime: process.uptime(), db: Boolean(database) })
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

app.post('/api/register', async (req, res) => {
  const { name, email, workspace, phone = '', password } = req.body || {}

  if (!name || !email || !workspace || !password) {
    return res.status(400).json({ error: 'Name, email, workspace, and password are required.' })
  }

  try {
    const db = ensureDb()
    const usersCollection = db.collection('users')
    const normalizedEmail = normalizeEmail(email)

    const existingUser = await usersCollection.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered. Please login.' })
    }

    let workspaceSlug = buildWorkspaceSlug(workspace)
    const slugExists = await usersCollection.findOne({ workspaceSlug })
    if (slugExists) {
      workspaceSlug = `${workspaceSlug}-${Date.now().toString(36)}`
    }

    await usersCollection.insertOne({
      name,
      email: normalizedEmail,
      workspace,
      workspaceSlug,
      phone,
      password,
      createdAt: new Date(),
      lastLogin: null
    })

    return res.status(201).json({ message: 'Workspace created. Proceed to login.', workspaceSlug })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ error: 'Registration failed. Inspect server logs for details.' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    const db = ensureDb()
    const usersCollection = db.collection('users')
    const normalizedEmail = normalizeEmail(email)

    const user = await usersCollection.findOne({ email: normalizedEmail })
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' })
    }

    const lastLogin = new Date()
    await usersCollection.updateOne({ _id: user._id }, { $set: { lastLogin } })

    return res.json({
      message: 'Login successful.',
      workspaceSlug: user.workspaceSlug,
      lastLogin
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Login failed. Inspect server logs for details.' })
  }
})

const startServer = async () => {
  try {
    client = new MongoClient(mongoUri)
    await client.connect()
    database = client.db(mongoDbName)
    console.log(`Connected to MongoDB database "${mongoDbName}"`)

    app.listen(PORT, () => {
      console.log(`PingMe server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

process.on('SIGINT', async () => {
  await client?.close()
  process.exit(0)
})