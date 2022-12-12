import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './src/config/connect.js'
import route from './src/routes'
dotenv.config()

const app = express()
const corsOptions = { origin: '*' }


// app.use(morgan('combined'))
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


route(app)

const PORT = process.env.PORT || 3000;

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