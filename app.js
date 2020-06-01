const express = require('express')
const config = require('config')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json({extended: true}))
app.use('/api', require('./routes/routes'))

if(process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Error started server')  
    }
}

start()