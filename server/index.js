import http from 'node:http'

const PORT = process.env.API_PORT || 3001

const store = { contact: [], apply: [] }

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

function respond(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    respond(res, 200, {})
    return
  }

  if (req.method !== 'POST') {
    respond(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    const data = await readBody(req)

    if (req.url === '/api/contact') {
      store.contact.push({ ...data, timestamp: new Date().toISOString() })
      console.log('[Contact]', JSON.stringify(data, null, 2))
      respond(res, 200, { ok: true, message: 'Message received. We will be in touch within 1 business day.' })
    } else if (req.url === '/api/apply') {
      store.apply.push({ ...data, timestamp: new Date().toISOString() })
      console.log('[Apply]', JSON.stringify(data, null, 2))
      respond(res, 200, { ok: true, message: 'Application received. Our team will review it within 3-5 business days.' })
    } else {
      respond(res, 404, { error: 'Not found' })
    }
  } catch (err) {
    console.error('[API Error]', err)
    respond(res, 400, { error: err.message })
  }
})

server.listen(PORT, () => {
  console.log(`[API] Server running on http://localhost:${PORT}`)
})
