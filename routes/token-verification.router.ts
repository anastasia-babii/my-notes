import express from "express";
import { authMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "You have successfully accessed a secure route!" });
});

export { router as protectedRoute };
