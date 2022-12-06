import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import route from './app/routes'
import dotenv from 'dotenv'


const app = express()
dotenv.config()
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

app.use(express.urlencoded({extended: true}))
app.use(express.json())

route.route(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});