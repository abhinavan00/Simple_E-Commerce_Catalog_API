import http from 'node:http';
import { database } from './database/database.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';

const PORT = 5001

const server = http.createServer((req, res) => {
    const catalog = database()

    sendJSONResponse(res, 200, catalog)
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))