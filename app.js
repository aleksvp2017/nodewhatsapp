var express = require('express') 
var app = express()

var cors = require('cors')
app.use(cors())


app.get('/', function (req, res) {
    const client = require('twilio')()

    var recipient = req.query.number
    var msg = req.query.msg

    if (!recipient || !msg){
        res.send('Please send query parameters msg and number. Ex: http://localhost:8080/?msg=test&number=111111111')
        return
    }

    client.messages.create({
        from: 'whatsapp:+14155238886',
        body: msg,
        to: 'whatsapp:'+recipient
        }).then(message => {
            console.log('Message sent: ', message.sid)
            res.send('Message sent: ' + message.sid);
        }).catch(error => {
            console.log(error)
            res.send('Message not send. Error: ' + error);
        })
})

  app.listen('8080', () => { console.log('Server up and listening at 8080')})  