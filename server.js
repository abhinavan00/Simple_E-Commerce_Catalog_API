import http from 'node:http';
import { database } from './database/database.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js';

const PORT = 5001

const server = http.createServer(async (req, res) => {
    // DATA
    const catalog = await database()

    // URL OBJECT
    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    // PATH PARAMS
    const pathName = urlObj.pathname
    const pathSegments = pathName.split('/').filter(Boolean)

    // QUERY PARAMS
    const queryObj = Object.fromEntries(urlObj.searchParams)

    // RESPONSE
    if(urlObj.pathname === '/api/products' && req.method === 'GET') {
       
        const filteredData = getDataByQueryParams(catalog, queryObj)
        
        if(filteredData.length > 0) {
            sendJSONResponse(res, 200, filteredData)
        } else {
            sendJSONResponse(res, 404, {'erorr' : 'No Product Found!'})
        }

    } else if(pathSegments[2] && req.method === 'GET') {

        const productId = parseInt(pathSegments[2], 10)
        const product = catalog.filter(product => product.id === productId)

        if(isNaN(productId)) {
            sendJSONResponse(res, 400, {'error': 'Not a valid product id!'})
        } else if(product.length === 1) {
            sendJSONResponse(res, 200, product)
        } else {
            sendJSONResponse(res, 404, {'error': 'Product not found!'})
        }  
        
    } else if (req.url !== '/api/products' || req.method !== 'GET') {
        sendJSONResponse(res, 405, {'erorr' : 'Invalid url OR Wrong Method'})
    }

})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))