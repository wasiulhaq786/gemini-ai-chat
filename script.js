
const API_KEY = "Enter your api key";
const MODEL = "gemini-2.5-flash";

async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const output = document.getElementById("output");

  if (!input) return;

  output.innerHTML += "<p><b>You:</b> " + input + "</p>";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: input }]
          }]
        })
      }
    );

    const data = await response.json();

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    output.innerHTML += "<p><b>Gemini:</b> " + reply + "</p>";
    document.getElementById("userInput").value = "";

  } catch (error) {
    output.innerHTML += "<p style='color:red;'>Error: " + error.message + "</p>";
  }
}
