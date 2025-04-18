const express = require('express')
const dotenv = require('dotenv')
const connetToDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoute')
const limiter = require('./middleware/rateLimiter')
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware')
const fileUpload = require('express-fileupload')


dotenv.config()
const port =process.env.PORT ||  3000

const app = express()
//owsap security
app.use(express.json())
app.use(helmet())
app.use(sanitizeMiddleware)
app.use(hpp())


const corsOptions = {
    origin: "http://localhost:5173",  // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
    credentials: true,  // Allow cookies and authentication
  };
app.use(cors(corsOptions))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
//routes
app.use('/api/users',limiter,userRoutes)
app.use('/api/notes',limiter,noteRoutes)

//connection with Database
connetToDB()
app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.listen(port,()=>{
    console.log(`App listenig on http://localhost:${port}`);
})
