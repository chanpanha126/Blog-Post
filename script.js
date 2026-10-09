let posts = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!",
  },
  {
    id: 2,
    title: "Learning JavaScript",
    content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation.",
  },
  {
    id: 3,
    title: "Web Development Tips",
    content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary.",
  },
];
let nextId = 4;

const container = document.getElementById("posts");

function createButton(label, onClick) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function editField(post, field, label) {
  const value = prompt(`Edit ${label}:`, post[field]);
  if (value !== null && value.trim()) {
    post[field] = value.trim();
    render();
  }
}

function deletePost(post) {
  if (confirm("Delete this post?")) {
    posts = posts.filter((p) => p.id !== post.id);
    render();
  }
}

function render() {
  container.innerHTML = "";

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";
    const title = document.createElement("h2");
    title.textContent = post.title;
    header.append(title, createButton("Edit Title", () => editField(post, "title", "title")));

    const content = document.createElement("p");
    content.textContent = post.content;

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.append(
      createButton("Edit Content", () => editField(post, "content", "content")),
      createButton("Delete Post", () => deletePost(post))
    );

    card.append(header, content, actions);
    container.appendChild(card);
  });
}

document.getElementById("add-btn").addEventListener("click", () => {
  const title = prompt("Title of the new post:");
  if (!title || !title.trim()) return;
  const content = prompt("Content of the new post:");
  if (!content || !content.trim()) return;

  posts.push({ id: nextId++, title: title.trim(), content: content.trim() });
  render();
});

render();
