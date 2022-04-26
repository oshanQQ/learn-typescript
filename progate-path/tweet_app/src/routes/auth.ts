import express from "express";
import {body, validationResult} from "express-validator";
import {
  forbidAuthUser,
  isMatchEmailAndPassword,
  ensureAuthUser,
} from "@/middlewares/authentication";
import {User} from "@/models/user";

export const authRouter = express.Router();

/** 新規登録画面 */
authRouter.get("/signup", forbidAuthUser, (req, res) => {
  res.render("users/new", {
    user: {
      name: "",
      email: "",
      password: "",
    },
    errors: [],
  });
});

/** ログイン画面 */
authRouter.get("/signin", forbidAuthUser, (req, res) => {
  res.render("users/signin", {
    email: "",
    password: "",
    errors: [],
  });
});

/** ログイン */
authRouter.post(
  "/signin",
  forbidAuthUser,
  body("email", "メールアドレスを入力してください").notEmpty(),
  body("password", "パスワードを入力してください").notEmpty(),
  body("custom").custom(isMatchEmailAndPassword),
  async (req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/signin", {
        email,
        password,
        errors: errors.array(),
      });
    }
    const user = await User.findByEmail(email);
    if (!user) return next(new Error("Invalid error: The user is undefined."));
    req.authentication?.signin(user);
    req.dialogMessage?.setMessage("ログインしました");
    res.redirect("/posts");
  }
);

/** ログアウト */
authRouter.post("/signout", ensureAuthUser, async (req, res) => {
  req.authentication?.signout();
  req.dialogMessage?.setMessage("ログアウトしました");
  res.redirect("/signin");
});
