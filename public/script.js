const apiUrl = "/api/ai";

const form = document.getElementById("query-form");
const userInput = document.getElementById("user-query");
const messagesDiv = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display user's query
  addMessage(userMessage, "user");

  // Send query to the backend service
  try {
    const response = await fetch(`${apiUrl}?ask=${encodeURIComponent(userMessage)}`);
    const data = await response.json();

    // Display AI response
    if (data.response) {
      addMessage(data.response, "ai");
    } else {
      addMessage("Error: No response from AI.", "ai");
    }
  } catch (error) {
    addMessage("Error: Could not connect to the AI service.", "ai");
  }

  userInput.value = "";
});

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
