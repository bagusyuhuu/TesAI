function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6RNq9hqC6I0":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var tokenDariSlide = player.GetVar("HFToken"); 

// Link model (bisa diganti-ganti nanti)
var modelUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

fetch(modelUrl, {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + tokenDariSlide,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userMessage })
})
.then(response => response.json())
.then(data => {
    if (data.error && data.error.includes("loading")) {
        player.SetVar("AIResponse", "AI sedang loading... Tunggu 10 detik.");
    } else {
        // Ambil label hasil (POSITIVE/NEGATIVE)
        var sentiment = data[0][0].label;
        player.SetVar("AIResponse", sentiment);
    }
})
.catch(error => {
    console.error('Error:', error);
    player.SetVar("AIResponse", "Gagal koneksi. Cek Console (F12)");
});
}

