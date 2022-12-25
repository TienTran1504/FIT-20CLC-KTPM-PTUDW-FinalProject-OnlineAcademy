import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import connectDB from "./src/config/connect.js";
import route from "./src/routes";
import hbs_sections from "express-handlebars-sections";
import session from "express-session";
import activate_session from "./src/middleware/session.mdw";

dotenv.config();

const app = express();
const corsOptions = { origin: "*" };

app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use("/public", express.static("public"));
app.engine(
  "hbs",
  engine({
    // defaultLayout: 'main.hbs'
    extname: "hbs",
    helpers: {
      // Function to do basic mathematical operation in handlebar
      section: hbs_sections(),
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      },
    },
  })
);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //store: store,
    cookie: {
      //secure: true
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

activate_session(app);

route(app);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.URI_MONGODB);

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
