// Genera el mensaje en consola.
const socket = io();
socket.on("message", function (data) {
  const html = generateMessageHTML(data.username, data.timestamp, data.message);
  const element = document.createElement("li");
  element.innerHTML = html;
  document.getElementById("chat-messages").appendChild(element);
});
document.getElementById("send-message").addEventListener("click", function () {
  const message = document.getElementById("message").value;
  socket.emit("message", {
    username: "Felipe murillo",
    message: message,
    timestamp: new Date(),
  });
  document.getElementById("message").value = "";
});

// Recibe los mensajes historicos
socket.on("historical_messages", function (messages) {
  for (let message of messages) {
    const html = generateMessageHTML(
      message.username,
      message.timestamp,
      message.message
    );
    const element = document.createElement("li");
    element.innerHTML = html;
    document.getElementById("chat-messages").appendChild(element);
  }
});

// Mostrar mensaje
function generateMessageHTML(username, timestamp, message) {
  let formattedTimestamp;
  if (
    new Date().toLocaleDateString() === new Date(timestamp).toLocaleDateString()
  ) {
    // Same day, include only time
    formattedTimestamp = new Date(timestamp).toLocaleTimeString();
  } else {
    // Not the same day, include date and time
    formattedTimestamp = new Date(timestamp).toLocaleString();
  }
  const html = `
    <div class="flex space-x-2 pl-2 pt-2">
    <div class="flex-shrink-0">
    <div class="h-10 w-10 rounded-full bg-indigo-400 flex itemscenter justify-center font-bold text-white">
    ${username.charAt(0).toUpperCase()}
    </div>
    </div>
    <div class="flex flex-col">
    <div class="flex items-baseline space-x-2">
    <div class="font-bold">
    ${username.charAt(0).toUpperCase() + username.slice(1)}
    </div>
    <div class="text-sm text-gray-400">
    ${formattedTimestamp}
    </div>
    </div>
    <div class="text-sm text-gray-500">
    ${message}
    </div>
    </div>
    </div>
    `;
  return html;
}
