import express, {RequestHandler} from "express";
import {join} from "path";
import multer from "multer";
import {nanoid} from "nanoid";
import {User} from "@/models/user";
import {
  isUniqueEmail,
  ensureAuthUser,
  forbidAuthUser,
} from "@/middlewares/authentication";
import {ensureCorrectUser} from "@/middlewares/current_user";
import {body, validationResult} from "express-validator";
import {HashPassword} from "@/lib/hash_password";

export const userRouter = express.Router();

/** ユーザー一覧画面 */
userRouter.get("/", ensureAuthUser, async (req, res) => {
  const users = await User.all();
  res.render("users/index", {
    users,
  });
});

/** ユーザー作成 */
userRouter.post(
  "/create",
  forbidAuthUser,
  body("name", "ユーザー名を入力してください").notEmpty(),
  body("email", "メールアドレスを入力してください").notEmpty(),
  body("password", "パスワードを入力してください").notEmpty(),
  body("email").custom(isUniqueEmail),
  async (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/new", {
        user: {
          name,
          email,
          password,
        },
        errors: errors.array(),
      });
    }
    const hashPassword = await new HashPassword().generate(password);
    const user = new User(name, email, hashPassword);
    await user.save();

    req.authentication?.signin(user);
    req.dialogMessage?.setMessage("ユーザー登録が完了しました");
    res.redirect(`/users/${user.id}`);
  }
);

/** ユーザー詳細 */
userRouter.get("/:userId", ensureAuthUser, async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.find(Number(userId));
  if (!user) return next(new Error("Invalid error: The user is undefined."));
  const posts = await user.posts();
  const postsWithUser = await Promise.all(
    posts.map(async post => {
      const user = await post.user();
      return {
        ...post,
        user,
      };
    })
  );
  res.render("users/show", {
    user,
    posts: postsWithUser,
  });
});

/** ユーザーいいね一覧 */
userRouter.get("/:userId/likes", async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.find(Number(userId));
  if (!user) return next(new Error("Invalid error: The user is undefined."));
  const posts = await user.likedPosts();
  const postsWithUser = await Promise.all(
    posts.map(async post => {
      const user = await post.user();
      return {
        ...post,
        user,
      };
    })
  );
  res.render("users/show", {
    user,
    posts: postsWithUser,
  });
});

/** ユーザー編集 */
userRouter.get(
  "/:userId/edit",
  ensureAuthUser,
  ensureCorrectUser,
  async (req, res) => {
    const {userId} = req.params;
    const user = await User.find(Number(userId));
    res.render("users/edit", {
      user,
      errors: [],
    });
  }
);

const storage = multer.diskStorage({
  destination: join("public", "image", "users"),
  filename: (req, file, cb) => {
    const outFileName = `${nanoid()}.${file.mimetype.split("/")[1]}`;
    cb(null, outFileName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ACCEPTABLE_SUBTYPES = ["png", "jpeg"] as const;
    type AcceptableSubtype = typeof ACCEPTABLE_SUBTYPES[number];
    const toAcceptableImageMediaType = (
      fullMimeType: string
    ): ["image", AcceptableSubtype] | null => {
      const isAcceptableSubtype = (
        subtype: string
      ): subtype is AcceptableSubtype => {
        return (ACCEPTABLE_SUBTYPES as readonly string[]).includes(subtype);
      };
      const [mediaType, mediaSubtype] = fullMimeType.split("/");
      if (!mediaType || !mediaSubtype) return null;
      if (mediaType !== "image") return null;
      if (!isAcceptableSubtype(mediaSubtype)) return null;
      return ["image", mediaSubtype];
    };
    const mediaType = toAcceptableImageMediaType(file.mimetype);
    if (mediaType === null)
      return cb(
        new Error("pngもしくはjpeg形式の画像ファイルのみアップロードできます")
      );
    cb(null, true);
  },
});

const uploadHandler: RequestHandler = (req, res, next) => {
  const name = "image";
  upload.single(name)(req, res, err => {
    if (err instanceof Error) {
      req.uploadError = {
        param: name,
        msg: err.message,
        location: "body",
        value: req.file,
      };
    }
    next();
  });
};
/** ユーザー更新 */
userRouter.post(
  "/:userId/update",
  ensureAuthUser,
  ensureCorrectUser,
  uploadHandler,
  body("name", "ユーザー名を入力してください").notEmpty(),
  body("email", "メールアドレスを入力してください").notEmpty(),
  async (req, res, next) => {
    const {userId} = req.params;
    const {name, email} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty() || req.uploadError) {
      const validationErrors = errors.array();
      if (req.uploadError) {
        validationErrors.push(req.uploadError);
      }
      return res.render("users/edit", {
        user: {
          id: userId,
          name,
          email,
        },
        errors: validationErrors,
      });
    }

    const user = await User.find(Number(userId));
    if (!user) return next(new Error("Invalid error: The user is undefined."));
    Object.assign(user, {name, email});
    if (req.file) {
      user.imageName = req.file.path.replace("public", "");
    } else {
      console.log("no file");
    }

    await user.update();
    req.dialogMessage?.setMessage("ユーザー情報を編集しました");
    res.redirect(`/users/${user.id}`);
  }
);
