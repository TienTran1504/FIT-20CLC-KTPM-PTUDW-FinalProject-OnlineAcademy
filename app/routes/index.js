import createError from 'http-errors'


export default {
    route(app) { 
        app.get('/', (req, res, next) => {
            res.send('Hello')
        })
    
        app.use((req, res, next) => {
            next(next(createError.NotFound('This route does not exist.')))
        })
    
        app.use((err, req, res, next) => {
            res.json({
                status: err.status || 500,
                message: err.message
            })
        })
    }
}
