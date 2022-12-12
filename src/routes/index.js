import createError from "http-errors";
import adminRouter from "./admin.route";
import coursesRouter from "./course.route";
import studentRouter from "./student.route";
import teacherRouter from "./teacher.route";
import userRouter from "./user.route";

function route(app) {
  // app.use('/api/v1/auth', authRouter);
  app.use("/admin", adminRouter);
  app.use("/courses", coursesRouter);
  app.use("/student", studentRouter);
  app.use("/teacher", teacherRouter);
  app.use("/user", userRouter);

  app.use("/", (req, res, next) => {
    res.render("home");
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

export default route;
