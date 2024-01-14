import cookieParser from 'cookie-parser'
import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'

import { authRouter } from './Routes/auth.js'
import { usersRouter } from './Routes/users.js'
import { rolesRoute } from './Routes/roles.js'

export const app = express()

// Accessing .env file
config({
    path: './.env'
})


// Using middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));




// Routes
app.use(authRouter)

app.use(usersRouter)

app.use(rolesRoute)