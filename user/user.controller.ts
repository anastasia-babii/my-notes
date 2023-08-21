import express from "express";
import { UserService } from "./user.service";
import { FindUserByIdParamsDto } from "./dto/find-user-by-id.dto";
import { validateOrReject } from "class-validator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { authMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const createUserDto = new CreateUserDto(req.body);
    await validateOrReject(createUserDto);
    const userService = new UserService();
    const user = await userService.createUser(createUserDto);
    return res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put("/update-personal-data", authMiddleware, async (req, res, next) => {
  try {
    const updateUserDto = new UpdateUserDto(req.body);
    await validateOrReject(updateUserDto);

    const userEmail = req.user.email;
    const userService = new UserService();
    await userService.updatePersonalData(userEmail, updateUserDto);

    return res.json({ message: "User personal data updated successfully!" });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete-account", authMiddleware, async (req, res, next) => {
  try {
    const userService = new UserService();
    await userService.deleteUserById(req.user.id);

    return res.json({ message: "User account deleted successfully!" });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updateUserDto = new UpdateUserDto(req.body);
    await validateOrReject(updateUserDto);
    const userService = new UserService();
    await userService.updateUser(req.params.id, updateUserDto);
    res.send().status(200);
  } catch (err) {
    next(err);
  }
});

router.get("/personal-data", authMiddleware, async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const userService = new UserService();
    const user = await userService.getUserPersonalData(userEmail);

    return res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let findUserByIdParamsDto = new FindUserByIdParamsDto(req.params.id);
    await validateOrReject(findUserByIdParamsDto);
    const userService = new UserService();
    const user = await userService.findUserById(findUserByIdParamsDto);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const userService = new UserService();
    const user = await userService.deleteUserById(req.params.id);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

export { router as userRouter };
