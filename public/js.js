let socket = io.connect("http://localhost:3000");

const send_message = document.querySelector("#send_message");
const send_username = document.querySelector("#send_username");
const message = document.querySelector("#message");
const feedback = document.querySelector("#feedback");
const chatroom = document.querySelector("#chatroom");

send_message.addEventListener("click", function () {
  socket.emit("new_message", { message: message.value });
});

socket.on("new_message", (data) => {
  feedback.innerHTML = "";
  message.value = "";
  chatroom.innerHTML+=
    `<p class='message'><span class='nick'>${data.username}: </span>${data.message} </p>`;
});

message.addEventListener("keypress", () => {
  socket.emit("typing");
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><i>${data.username} is typing... </i></p>`;
});

send_username.addEventListener("click", function () {
  socket.emit("change_username", {
    username: document.querySelector("#username").value,
  });
});
