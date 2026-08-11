export function sendJSONResponse(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(data))
}