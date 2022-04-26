import express, {Express} from "express";
import session from "cookie-session";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import path from "path";
import {homeRouter} from "@/routes/home";
import {userRouter} from "@/routes/user";
import {authRouter} from "@/routes/auth";
import {postRouter} from "@/routes/post";
import {likeRouter} from "@/routes/like";
import {dialogMessageMiddleware} from "@/middlewares/dialog_message";
import {currentUserMiddleware} from "@/middlewares/current_user";
import {authenticationMiddleware} from "@/middlewares/authentication";

export const loadMiddlewaresForTweetApp = (app: Express): void => {
  loadSecureHeaders(app);
  loadViews(app);
  loadStatic(app);
  loadBodyParser(app);
  loadSession(app);
  loadUser(app);
  loadMessage(app);
  loadRouter(app);
};

const loadViews = (app: Express): void => {
  app.set("view engine", "ejs");
  app.set("views", path.join(path.resolve(), "src/views"));
  app.use(expressLayouts);
};

const loadStatic = (app: Express): void => {
  app.use(express.static("public"));
};

const loadBodyParser = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
};

const loadSession = (app: Express): void => {
  app.use(
    session({
      name: "session",
      keys: ["some random secret key here"],
      // `secure` is set to true only when the app is running in production.
      //
      // If you are behind a reverse proxy, you must enable 'trust proxy' option
      // by `app.set('trust proxy', 1)`.
      // See https://expressjs.com/en/guide/behind-proxies.html for more details.
      secure: app.get("env") === "production",
      httpOnly: true,
      sameSite: "lax",
      // This MUST be true, otherwise malicious users can set arbitrary cookies
      // and it can lead data breach.
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
    })
  );
};

/**
 * アクション成功時にダイアログメッセージ表示する
 * メッセージは初回のみ表示されリロード後消える
 * Ex：フォーム送信後のリダイレクト先で「成功しました」と表示する
 */
const loadMessage = (app: Express): void => {
  app.use(dialogMessageMiddleware);
};

/**
 * ログイン情報をビューに渡す
 * 未ログイン時は null を渡す
 */
const loadUser = (app: Express): void => {
  app.use(authenticationMiddleware);
  app.use(currentUserMiddleware);
};

const loadRouter = (app: Express): void => {
  app.use("/", homeRouter);
  app.use("/", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/likes", likeRouter);
};

const loadSecureHeaders = (app: Express): void => {
  app.use(helmet());
  if (app.get("env") === "development" || app.get("env") === "test") {
    // safariではlocalhostでもhttpsにリダイレクトされてしまいページが表示できない
    // 開発・テスト環境ではupgradeInsecureRequests設定を外して対応
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
        },
      })
    );
  }
};
