import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/signin", UserController.signIn);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get("/users/:id", UserController.getSingleUserById);

export const UserRoutes = router;

//auth(ENUM_USER_ROLE.STUDENT)
