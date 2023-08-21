import { Request, Response, NextFunction, Router } from "express";
import BadRequestError from "../../error/http-error-bad-request";
import { Name } from "../../types/interfaces";

const router = Router();

router.get("/cat", (req: Request, res: Response) => {
  res.send("Hello, I love cats");
});

router.get("/data", (req: Request, res: Response, next) => {
  const queryData = req.query;

  if (!Object.keys(queryData).length) {
    return next(new BadRequestError("Query parameters not provided"));
  }

  return res.status(200).json(queryData);
});

router.get("/user/:id", (req: Request, res: Response, next) => {
  const { id } = req.params;
  const name = req.params.fullname;

  if (!id) {
    return next(new BadRequestError("Missing param id"));
  }

  const data = { id, message: "Data found", name };
  return res.status(200).json(data);
});

router.post("/name", (req: Request, res: Response, next) => {
  const { firstName, lastName }: Name = req.body;

  // Checking if the firstName and lastName properties are provided
  if (!firstName || !lastName) {
    return next(
      new BadRequestError("firstName and/or lastName missing from request body")
    );
  }

  const fullName = `${firstName} ${lastName}`;
  return res.status(200).json({ fullName });
});

export { router as lesson1Router };
