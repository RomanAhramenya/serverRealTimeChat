const express = require("express")
const cors = require("cors")
const events = require('events')
const PORT = process.env.PORT || 5000;

const emmitter = new events.EventEmitter()
const app = express()

app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}))
app.use(express.json())
app.get('/get-messages', (req,res) => {
    emmitter.once('newMessage', (message) => {
        res.json(message)
    })
})
app.post('/new-messages', (req,res) => {
    const message = req.body;
    emmitter.emit('newMessage',message)
    res.status(200)
})
app.listen(PORT, () => console.log('server started ' + PORT))
