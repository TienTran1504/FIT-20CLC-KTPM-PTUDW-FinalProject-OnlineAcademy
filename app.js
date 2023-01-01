import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import connectDB from "./src/config/connect.js";
import activate_route from "./src/routes";
import hbs_sections from "express-handlebars-sections";
import activate_session from "./src/middleware/session.mdw";
import activate_locals from "./src/middleware/locals.mdw";

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
      isEmpty: function(value) {
        return value === "";
      },
      checkTeacher: function (value) {
        return value === "Teacher"
      },
      ifEqualString: function (obj, value) {
        return (obj === value);
      }
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

activate_session(app);
activate_locals(app);
activate_route(app);

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
