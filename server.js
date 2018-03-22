const express = require('express')
const app = express()
const fs = require('fs')
const shell = require('shelljs')

const PORT = 8080

app.get('/' || '*.php', (req, res, next) => {
    var file = req.originalUrl.split('?')[0]
    if(req.originalUrl.split('?')[0] === '/') {
        if (fs.existsSync('HTTPFiles/index.php')) 
        {
            file = "/index.php"
        }
        else
        {
            next()
            return
        }
    }
    shell.exec("php HTTPFiles"+file , {silent: true}, (code, stdout, stderr) => {
        if(code === 0) {
            res.send(stdout)
        }
        else {
            res.send(stderr)
        }
    })
})

app.use(express.static(__dirname + '/HTTPFiles'))

app.use((req, res) => {
    res.sendStatus(404)
})

const server = app.listen(PORT, (error) => {
    if(error) throw error
    console.log("Server Started at Port "+PORT)
}) 