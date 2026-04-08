function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6j30VfLstYm":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var apiToken = "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"; // Ganti dengan token kamu

// Kirim request dengan fetch standar
fetch("https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english", {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + apiToken,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userMessage })
})
.then(response => {
    if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
    }
    return response.json();
})
.then(data => {
    // Jika model sedang loading
    if (data.error && data.error.includes("loading")) {
        player.SetVar("AIResponse", "Loading AI...");
    } else {
        var sentiment = data[0][0].label;
        player.SetVar("AIResponse", sentiment);
    }
})
.catch(error => {
    console.error('Error:', error);
    player.SetVar("AIResponse", "Masih CORS/Error");
});
}

