import {RequestHandler} from "express";
import {User} from "@/models/user";
import {Post} from "@/models/post";

/**
 * ログインしている場合はビューの currentUser にユーザー情報をセットする
 * 未ログインの場合は null をセットする
 */
export const currentUserMiddleware: RequestHandler = async (req, res, next) => {
  if (req.authentication?.currentUserId === undefined) {
    res.locals.currentUser = null;
  } else {
    res.locals.currentUser = await User.find(req.authentication.currentUserId);
  }
  next();
};

export const ensureCorrectUser: RequestHandler = async (req, res, next) => {
  if (req.session === null || req.session === undefined) {
    next();
    return;
  }
  const {userId} = req.params;
  if (req.authentication?.currentUserId === Number(userId)) {
    next();
  } else {
    req.dialogMessage?.setMessage("権限がありません");
    res.redirect("/posts");
  }
};

export const ensureOwnerOfPost: RequestHandler = async (req, res, next) => {
  const {postId} = req.params;
  const post = await Post.find(Number(postId));
  const owner = await post?.user();
  if (owner && owner.id === req.authentication?.currentUserId) {
    res.locals.post = post;
    next();
  } else {
    req.dialogMessage?.setMessage("権限がありません");
    res.redirect("/posts");
  }
};
