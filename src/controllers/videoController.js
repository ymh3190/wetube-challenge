export const index = (req, res) => res.render("index", { pageTitle: "" });
export const search = (req, res) =>
  res.render("search", { pageTitle: "Search" });
export const edit = (req, res) =>
  res.render("edit-video", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => {};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {};
