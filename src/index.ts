import express from 'express'
import { AppDataSource } from './data-source'
import letters from './routes/Letter.Routes'
import users from './routes/User.Routes'
import { errorMiddleware } from './middlewares/error'


const server = AppDataSource.initialize().then(()=>{
    const app = express()
    app.use(express.json())
    
    app.use('/letters', letters)
    app.use('/users', users)
    
    app.use(errorMiddleware)
    
    return app.listen(process.env.PORT)
})

export default server