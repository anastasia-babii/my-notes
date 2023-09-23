import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { ValidationError } from "class-validator";

import HTTPError from "./error/http-error";
import { lesson1Router } from "./routes/lesson1/lesson1.router";
import { lesson2Router } from "./routes/lesson2/lesson2.router";
import { userRouter } from "./user/user.controller";
import { AppDataSource } from "./datasource";
import { authRouter } from "./auth/auth.controller";
import ValidationHTTPError from "./error/http-error-validation";
import { protectedRoute } from "./routes/token-verification.router";
import { noteRouter } from "./notes/note.controller";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/lesson1", lesson1Router);
app.use("/lesson2", lesson2Router);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/protected-route", protectedRoute);
app.use("/note", noteRouter);

app.use("/lesson2", express.static("static"));

app.use((err, req: Request, res: Response, next: NextFunction) => {
  const { status, message, originalErr } = err;
  console.log(originalErr ? originalErr : err);

  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    const { status, message } = new ValidationHTTPError(err);
    res.status(status).send({
      errorMessage: message,
    });
  } else if (err instanceof HTTPError) {
    console.log("Status error: " + status + " .Message: " + message);
    res.status(status).send({ errorMessage: message });
  } else {
    res.status(500).json({ someError: "Something went wrong" });
  }
});

AppDataSource.initialize()
  .then(() => app.listen(3001))
  .then(() => {
    console.log("Server is listening on port 3001");
  });
