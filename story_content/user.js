function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6Am1ndMb8ff":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var apiToken = "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"; // Pastikan token benar

async function queryAI() {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
            {
                headers: { 
                    "Authorization": "Bearer " + apiToken,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({inputs: userMessage}),
            }
        );
        
        const result = await response.json();
        
        // Cek jika model sedang loading (Error 503)
        if (result.error && result.error.includes("currently loading")) {
            player.SetVar("AIResponse", "Model sedang loading, tunggu 10 detik...");
        } else {
            var sentiment = result[0][0].label;
            player.SetVar("AIResponse", sentiment);
        }
        
    } catch (error) {
        console.error('Error detail:', error);
        player.SetVar("AIResponse", "Gagal koneksi");
    }
}

queryAI();
}

