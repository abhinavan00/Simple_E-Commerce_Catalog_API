import http from 'node:http';
import { database } from './database/database.js';

const PORT = 5001

const server = http.createServer((req, res) => {
    const catalog = database()

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(catalog))
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))