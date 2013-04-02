/**
 * Service errors
 */
module.exports = {
    e400: { code: 400, message: 'Invalid request.' },
    e401: { code: 401, message: 'Unauthorized.' },
    e403: { code: 403, message: 'Forbidden.' },
    e404: { code: 404, message: 'Resource not found.' },
    e500: { code: 500, message: 'Internal server error.' },
    e503: { code: 503, message: 'Database access error.' }
};