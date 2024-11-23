const fs = require('fs');
const http = require('http');
const httpServer = http.createServer();

httpServer.on('listening', () => {
    console.log('Server is listening!');
})

httpServer.on('request', (req, res) => {
    if (req.url === "/") {
        res.end(fs.readFileSync('index.html'));
        return
    }

    if (req.url === "/upload") {
        const fileName = req.headers["file-name"];
        req.on('data', chunk => {
            fs.appendFileSync(fileName, chunk)
            console.log(`received chunk! ${chunk.length}`)
        })
        res.end('uploaded')
    }
})

httpServer.listen(8080)