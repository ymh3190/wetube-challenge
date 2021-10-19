import bcrypt from "bcrypt";
import User from "../models/User";

export const getSignup = (req, res) =>
  res.render("signup", { pageTitle: "회원가입" });

export const postSignup = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  const pageTitle = "회원가입";

  if (password !== password2) {
    return res.status(400).render("signup", {
      pageTitle,
      errMsg: "비밀번호가 일치하지 않습니다.",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("signup", {
      pageTitle,
      errMsg: "이메일 혹은 유저네임이 이미 존재합니다.",
    });
  }

  try {
    await User.create({
      username,
      email,
      password,
    });
    return res.redirect("/signin");
  } catch (err) {
    return res
      .status(400)
      .render("signup", { pageTitle, errMsg: err._message });
  }
};

export const getSignin = (req, res) =>
  res.render("signin", { pageTitle: "Signin" });

export const postSignin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "로그인";
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("signin", {
      pageTitle,
      errMsg: "입력한 이메일로 가입한 유저가 없습니다.",
    });
  }

  const correct = bcrypt.compare(password, user.password);
  if (!correct) {
    return res
      .status(400)
      .render("signin", { pageTitle, errMsg: "비밀번호를 틀렸습니다." });
  }
  return res.redirect("/");
};

export const logout = (req, res) => {};

export const edit = (req, res) =>
  res.render("edit-profile", { pageTitle: "Edit Profile" });
