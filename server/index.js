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
let useInMemoryDb = false

// In-memory database for development (fallback)
const inMemoryUsers = []

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
  if (!database && !useInMemoryDb) {
    throw new Error('Database not initialised yet. Wait for Mongo connection.')
  }
  return database
}

app.get('/api/health', (_, res) => {
  res.json({ 
    status: 'ok', 
    service: 'PingMe API', 
    uptime: process.uptime(), 
    db: Boolean(database),
    mode: useInMemoryDb ? 'in-memory' : 'mongodb'
  })
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
    const normalizedEmail = normalizeEmail(email)
    
    // Check if using in-memory database
    if (useInMemoryDb) {
      const existingUser = inMemoryUsers.find(u => u.email === normalizedEmail)
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered. Please login.' })
      }

      let workspaceSlug = buildWorkspaceSlug(workspace)
      const slugExists = inMemoryUsers.find(u => u.workspaceSlug === workspaceSlug)
      if (slugExists) {
        workspaceSlug = `${workspaceSlug}-${Date.now().toString(36)}`
      }

      const newUser = {
        _id: Date.now().toString(),
        name,
        email: normalizedEmail,
        workspace,
        workspaceSlug,
        phone,
        password,
        createdAt: new Date(),
        lastLogin: null
      }

      inMemoryUsers.push(newUser)
      console.log(`[In-Memory DB] User registered: ${normalizedEmail}`)
      
      return res.status(201).json({ message: 'Workspace created. Proceed to login.', workspaceSlug })
    }

    // Use MongoDB
    const db = ensureDb()
    const usersCollection = db.collection('users')

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
    const normalizedEmail = normalizeEmail(email)
    
    // Check if using in-memory database
    if (useInMemoryDb) {
      const user = inMemoryUsers.find(u => u.email === normalizedEmail)
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials.' })
      }

      const lastLogin = new Date()
      user.lastLogin = lastLogin
      console.log(`[In-Memory DB] User logged in: ${normalizedEmail}`)

      return res.json({
        message: 'Login successful.',
        workspaceSlug: user.workspaceSlug,
        lastLogin
      })
    }

    // Use MongoDB
    const db = ensureDb()
    const usersCollection = db.collection('users')

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
    // Try to connect to MongoDB
    console.log(`Attempting to connect to MongoDB...`)
    client = new MongoClient(mongoUri)
    
    // Set connection timeout
    const connectionPromise = client.connect()
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 10000)
    )
    
    await Promise.race([connectionPromise, timeoutPromise])
    database = client.db(mongoDbName)
    console.log(`✅ Connected to MongoDB database "${mongoDbName}"`)

    app.listen(PORT, () => {
      console.log(`🚀 PingMe server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message)
    console.log('📝 Switching to in-memory database for development...')
    console.log('💡 To use MongoDB:')
    console.log('   1. Start local MongoDB: mongod')
    console.log('   2. Or fix your MongoDB Atlas connection string in .env')
    console.log('   3. Or whitelist your IP in MongoDB Atlas Network Access')
    
    useInMemoryDb = true
    
    app.listen(PORT, () => {
      console.log(`🚀 PingMe server running on http://localhost:${PORT} (In-Memory Mode)`)
      console.log('⚠️  Note: Data will be lost when server restarts')
    })
  }
}

startServer()

process.on('SIGINT', async () => {
  await client?.close()
  process.exit(0)
})