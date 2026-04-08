function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5u8T9juwcqh":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var apiToken = "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"; // Token kamu

async function queryAI() {
    // Kita gunakan proxy untuk membypass blokir CORS browser
    const proxyUrl = "https://corsproxy.io/?"; 
    const targetUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + apiToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({inputs: userMessage})
        });
        
        const result = await response.json();
        
        // Cek jika model sedang loading
        if (result.error && result.error.includes("loading")) {
            player.SetVar("AIResponse", "Sedang memanaskan mesin AI... Klik lagi dalam 10 detik.");
        } else {
            // Mengambil label sentimen
            var sentiment = result[0][0].label; 
            player.SetVar("AIResponse", sentiment);
        }
        
    } catch (error) {
        console.error('Error detail:', error);
        player.SetVar("AIResponse", "Gagal koneksi via Proxy");
    }
}

queryAI();
}

