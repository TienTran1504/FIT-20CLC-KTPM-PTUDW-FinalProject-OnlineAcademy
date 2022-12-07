import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import route from './app/routes'
import dotenv from 'dotenv'
import asyncError from 'express-async-errors'
import authenticateUser from './app/middleware/authentication'
//routers

import {
  adminRouter,
  authRouter,
  coursesRouter,
  studentRouter,
  teacherRouter,
  userRouter
} from './app/test/routes/index'
import notFoundMiddleware from './app/middleware/not-found';
import errorHandlerMiddleware from './app/middleware/error-handler';
import connectDB from './app/config/connectDB'

const app = express()
dotenv.config()
asyncError
const corsOptions = { origin: '*' }


app.use(morgan('combined'))
app.use(cors(corsOptions))

app.use('/public', express.static('public'));

app.engine('hbs', engine({
  // defaultLayout: 'main.hbs'
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', authenticateUser, adminRouter);
app.use('/api/v1/courses', authenticateUser, coursesRouter);
app.use('/api/v1/student', authenticateUser, studentRouter);
app.use('/api/v1/teacher', authenticateUser, teacherRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// route.route(app)

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
const start = async () => {
  try {
    await connectDB(process.env.URI_MONGODB);
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();