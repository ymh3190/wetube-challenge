import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { heroku } from "../middlewares";

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
  const { username, password } = req.body;
  const pageTitle = "로그인";
  const user = await User.findOne({ username, isGithub: false });
  if (!user) {
    return res.status(400).render("signin", {
      pageTitle,
      errMsg: "입력한 정보로 가입한 유저가 없습니다.",
    });
  }

  const correct = bcrypt.compare(password, user.password);
  if (!correct) {
    return res
      .status(400)
      .render("signin", { pageTitle, errMsg: "비밀번호를 틀렸습니다." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const githubLogin = (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(url);
};

export const callbackGithubLogin = async (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://github.com/login/oauth/access_token?${params}`;
  const tokenRequest = await (
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const url = "https://api.github.com/user";
    const userData = await (
      await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${url}/emails`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/signin");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        username: userData.login,
        email: emailObj.email,
        password: "",
        isGithub: true,
        avatarUrl: userData.avatar_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/signin");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) =>
  res.render("edit-profile", { pageTitle: "Edit Profile" });

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { username, email },
    file,
  } = req;
  // 1. 로그인한 유저와 세션에 저장된 유저와 같은지 체크
  if (req.session.user._id === res.locals.user._id) {
    // 2. 이메일과 유저네임 중복체크
    let exist = false;
    if (
      username === req.session.user.username &&
      email !== req.session.user.email
    ) {
      exist = await User.exists({ email });
    } else if (
      email === req.session.user.email &&
      username !== req.session.user.username
    ) {
      exist = await User.exists({ username });
    } else if (
      username === req.session.user.username &&
      email === req.session.user.email
    ) {
      exist = false;
    }
    if (exist) {
      return res.status(400).render("edit-profile", {
        pageTitle: "Edit Profile",
        errMsg: "이메일 혹은 유저네임이 이미 존재합니다.",
      });
    }
    const user = await User.findByIdAndUpdate(
      _id,
      {
        username,
        email,
        avatarUrl: file ? (heroku ? file.location : file.path) : avatarUrl,
      },
      { new: true }
    );
    req.session.user = user;
    return res.redirect("/users/edit");
  }
};

export const getChangePassword = (req, res) => {
  if (req.session.user.isGithub === true) {
    return res.redirect("/");
  }
  res.render("change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await User.findById(_id);
  const correct = await bcrypt.compare(oldPassword, user.password);
  if (!correct) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errMsg: "기존 비밀번호가 일치하지 않습니다.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errMsg: "새로운 비밀번호가 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/");
};

export const see = (req, res) => {};
