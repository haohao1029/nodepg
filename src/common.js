module.exports = {
    response (res, status, success, message, data = {}) {
        params = {
            "success": success,
            "message": message,
            "data": data,
        }
        res.status(status).send(params)
    },
    responseAll (res, status, success, message, pagination, data = {}) {
        params = {
            "success": success,
            "message": message,
            "pagination": pagination,
            "data": data,
        }
        res.status(status).send(params)
    }

}