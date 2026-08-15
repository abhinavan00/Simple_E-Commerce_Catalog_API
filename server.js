import http from 'node:http';
import { database } from './database/database.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js';
import { error } from 'node:console';

const PORT = 5001

const server = http.createServer(async (req, res) => {
    // DATA
    const catalog = await database()

    // URL OBJECT
    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    // PATH PARAMS
    const pathName = urlObj.pathname
    const pathSegments = pathName.split('/').filter(Boolean)

    // ROOT ROUTE CHECK
    if(pathSegments[0] !== 'api' && pathSegments[1] !== 'products') {
        return sendJSONResponse(res, 404, {error: 'Route not found!'})
    }

    // HTTP Method Check
    if(req.method !== 'GET') {
        return sendJSONResponse(res, 405, {error: `Method ${req.method} not allowed at this endpoint!`})
    }

    // GET ALL PRODUCTS OR QUERY FILTERED PRODUCTS
    if(pathSegments.length === 2) {
        // QUERY PARAMS
        const queryObj = Object.fromEntries(urlObj.searchParams)
       
        // FILTER DATA AND SEND RESPONSE
        const filteredData = getDataByQueryParams(catalog, queryObj)
        return sendJSONResponse(res, 200, filteredData)

    }
    
    // GET SINGLE PRODUCT
    if(pathSegments.length === 3) {

        const productId = parseInt(pathSegments[2], 10)

        // IN CASE NOT A VALID PRODUCT ID
        if(isNaN(productId)) {
           return sendJSONResponse(res, 400, {'error': 'Not a valid product id!'})
        }
        
        // FIND THE PRODUCT
        const product = catalog.find(p => p.id === productId)
        
        // IF NO PRODUCT FOUND
        if(!product) {
            return sendJSONResponse(res, 404, {error: 'No Product Found!'})
        }

        return sendJSONResponse(res, 200, product)
        
    } 

    // FALLBACK FOR DEEPER UNKNOWN PATH
    sendJSONResponse(res, 404, {error: 'Endpoint not found!'})
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))