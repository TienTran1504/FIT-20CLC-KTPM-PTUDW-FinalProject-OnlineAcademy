import createError from "http-errors";
import adminRouter from "./admin.route";
import coursesRouter from "./course.route";
import studentRouter from "./student.route";
import teacherRouter from "./teacher.route";
import userRouter from "./user.route";
import accountRouter from "./account.route";
import categoriesRouter from "./categories.route";
import homeRouter from "./home.route";

export default function (app) {
  // app.use('/api/v1/auth', authRouter);
  app.use("/admin", adminRouter);
  app.use("/courses", coursesRouter);
  app.use("/student", studentRouter);
  app.use("/teacher", teacherRouter);
  app.use("/user", userRouter);
  app.use("/account", accountRouter);
  app.use("/categories", categoriesRouter);

  app.use("/", homeRouter);

  app.use(async function (req, res, next) {
    if (typeof req.session.auth === "undefined") {
      req.session.auth = false;
    }

    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    next();
  });

  app.use((req, res, next) => {
    next(next(createError.NotFound("This route does not exist.")));
  });

  app.use((err, req, res, next) => {
    res.json({
      status: err.status || 500,
      message: err.message,
    });
  });
}
