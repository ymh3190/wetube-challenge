export const index = (req, res) => res.render("index", { pageTitle: "" });
export const search = (req, res) =>
  res.render("search", { pageTitle: "Search" });
export const edit = (req, res) =>
  res.render("edit-video", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => {};
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
