import http from 'node:http';
import { database } from './database/database.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { type } from 'node:os';

const PORT = 5001

const server = http.createServer((req, res) => {
    const catalog = database()

    // URL OBJECT
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const pathName = urlObj.pathname
    const pathSegments = pathName.split('/').filter(Boolean)

    // RESPONSE
    if(pathSegments[2]) {
        const productId = parseInt(pathSegments[2], 10)
        const product = catalog.filter(product => product.id === productId)

        if(isNaN(productId)) {
            sendJSONResponse(res, 400, {'error': 'Not a valid product id!'})
        } else if(product.length === 1) {
            sendJSONResponse(res, 200, product)
        } else {
            sendJSONResponse(res, 404, {'error': 'Product not found!'})
        }

    } else if(!pathSegments[2]) {

        sendJSONResponse(res, 200, catalog)
        
    }
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))