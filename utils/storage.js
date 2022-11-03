const Cloud = require('@google-cloud/storage')
require('dotenv').config()

const { Storage } = Cloud
const storage = new Storage({
  credentials: JSON.parse(process.env.SERVICE_KEY),
  projectId: process.env.PROJECT_ID,
})

module.exports = storage