import Video from "../models/Video";

export const index = async (req, res) => {
  const videos = await Video.find({});
  res.render("index", { pageTitle: "", videos });
};

export const search = async (req, res) => {
  const {
    query: { query },
  } = req;
  let videos = [];
  if (query) {
    videos = await Video.find({
      title: { $regex: new RegExp(query, "i") },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const watch = async (req, res) => {
  const video = await Video.findById(req.params.id);
  return res.render("watch", { pageTitle: "Watch", video });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    return res.render("edit-video", { pageTitle: "Edit Video", video });
  } catch (err) {
    return res
      .status(400)
      .render("edit-video", { pageTitle: "Edit Video", errMsg: err._message });
  }
};
export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  const exist = await Video.exists({ id });
  if (!exist) {
    return res.status(400).render("edit-video", {
      pageTitle: "Edit Video",
      errMsg: err._message,
    });
  }
  try {
    await Video.findByIdAndUpdate(id, { title, description });
    return res.redirect(`/videos/${id}`);
  } catch (err) {
    return res
      .status(400)
      .render("edit-video", { pageTitle: "Edit Video", errMsg: err._message });
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const exist = await Video.exists({ id });
  if (!exist) {
    return res.status(400).render("edit-video", {
      pageTitle: "Edit Video",
      errMsg: "비디오 존재하지 않습니다.",
    });
  }
  try {
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    return res.status(400).render("edit-video", {
      pageTitle: "Edit Video",
      errMsg: err._message,
    });
  }
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const { file } = req;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl: file.path,
      hashtags,
    });
    return res.redirect("/");
  } catch (err) {
    return res
      .status(400)
      .render("upload", { pageTitle: "Upload", errMsg: err._message });
  }
};
