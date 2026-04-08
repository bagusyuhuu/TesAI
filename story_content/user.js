function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5vM3Q5c1539":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var apiToken = "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"; // Ganti dengan token kamu

// URL Model - Kita gunakan DistilBERT karena sangat stabil
var modelUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

fetch(modelUrl, {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + apiToken,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userMessage })
})
.then(response => {
    if (!response.ok) {
        // Jika error 503 (Loading) atau 401 (Unauthorized)
        return response.json().then(err => { throw err; });
    }
    return response.json();
})
.then(data => {
    if (data.error && data.error.includes("loading")) {
        player.SetVar("AIResponse", "Sedang memanaskan AI... (Tunggu 10 detik)");
    } else {
        // Ambil label hasil analisis
        var sentiment = data[0][0].label; 
        player.SetVar("AIResponse", sentiment);
    }
})
.catch(error => {
    console.error('Error detail:', error);
    player.SetVar("AIResponse", "Error: " + (error.error || "Cek Koneksi/Token"));
});
}

