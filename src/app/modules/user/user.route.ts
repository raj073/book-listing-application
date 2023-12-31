import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/signin", UserController.signIn);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUserById
);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
