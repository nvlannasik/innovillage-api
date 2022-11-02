const Cloud = require('@google-cloud/storage')
const path = require('path')
require('dotenv').config()
// const serviceKey = require('https://storage.googleapis.com/ini-bucket-proyek-1/key.json')

const { Storage } = Cloud
const storage = new Storage({
  credentials: JSON.parse(process.env.SERVICE_KEY),
  // keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
})

module.exports = storage