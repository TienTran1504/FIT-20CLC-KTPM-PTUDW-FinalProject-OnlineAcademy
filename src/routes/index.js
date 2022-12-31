import createError from "http-errors";
import adminRouter from "./admin.route";
import coursesRouter from "./course.route";
import studentRouter from "./student.route";
import teacherRouter from "./teacher.route";
import userRouter from "./user.route";
import accountRouter from "./account.route";
import categoriesRouter from "./categories.route";
import homeRouter from "./home.route";
import { checkTeacher } from "../middleware/checkPermission.mdw";

export default function (app) {
  // app.use('/api/v1/auth', authRouter);
  app.use("/admin", adminRouter);
  app.use("/courses", coursesRouter);
  app.use("/student", studentRouter);
  app.use("/teacher", checkTeacher, teacherRouter);
  app.use("/user", userRouter);
  app.use("/account", accountRouter);
  app.use("/categories", categoriesRouter);

  app.use("/", homeRouter);

  // app.use((req, res, next) => {
  //   next(createError.NotFound("This route does not exist."));
  // });

  // app.use((err, req, res, next) => {
  //   res.json({
  //     status: err.status || 500,
  //     message: err.message,
  //   });
  // });
  app.use(function (req, res, next) {
    res.render('404', { layout: false });
  });

  app.use(function (err, req, res, next) {
    res.status(500).render('500', {
      stack: err.stack,
      layout: false
    });
  });
}
