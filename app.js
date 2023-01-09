import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./src/config/connect.js";
import activate_route from "./src/routes";
import activate_session from "./src/middleware/session.mdw";
import activate_locals from "./src/middleware/locals.mdw";
import activate_hbs from "./src/middleware/handlebars.mdw";
dotenv.config();

const app = express();
const corsOptions = { origin: "*" };

// app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

activate_hbs(app);
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
