import http from 'node:http';

const PORT = 5001

const server = http.createServer((req, res) => {
    res.end('Hello from Server')
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))