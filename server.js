const path = require('path')
const express = require('express')
const app = express(),
            DIST_DIR = path.join(__dirname, 'dist'),
            HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))

const PORT = process.env.PORT || 8080
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})