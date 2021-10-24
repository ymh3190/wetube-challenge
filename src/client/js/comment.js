const videoContainer = document.querySelector("#videoContainer");
const commentForm = document.querySelector("#commentForm");
const deleteBtns = document.querySelectorAll("#deleteBtn");
const comments = document.querySelector("#comments");

const addComment = (text, id) => {
  const videoComments = document.querySelector("#comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const textarea = commentForm.querySelector("textarea");
  const id = videoContainer.dataset.id;
  const text = textarea.value;
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newComment } = await response.json();
    addComment(text, newComment);
  }
};

const handleDelete = async (e) => {
  const comment = e.target.parentElement.parentElement;
  const { id } = comment.dataset;
  await fetch(`/api/comments/${id}/delete`, {
    method: "delete",
  });
  const ul = comments.querySelector("ul");
  ul.removeChild(comment);
};

if (commentForm) {
  commentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", handleDelete)
  );
}
