function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6lhs8LxlTLF":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");
var apiToken = player.GetVar("HFToken"); // Ambil dari variabel Storyline agar tidak kena blokir GitHub Secret Scanning

async function callHuggingFace() {
    const modelUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

    try {
        const response = await fetch(modelUrl, {
            headers: {
                "Authorization": "Bearer " + apiToken,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: userMessage }),
        });

        const result = await response.json();

        if (response.status === 503) {
            player.SetVar("AIResponse", "Model sedang loading... Coba lagi dalam 10 detik.");
        } else if (response.status === 401) {
            player.SetVar("AIResponse", "Token Salah/Tidak Valid.");
        } else if (result && result[0] && result[0][0]) {
            var sentiment = result[0][0].label; // Contoh: "POSITIVE"
            player.SetVar("AIResponse", sentiment);
        } else {
            player.SetVar("AIResponse", "Respon AI tidak terdeteksi.");
        }

    } catch (error) {
        console.error("Detail Error:", error);
        player.SetVar("AIResponse", "Gagal Koneksi: " + error.message);
    }
}

// Jalankan fungsi
if (userMessage && apiToken) {
    callHuggingFace();
} else {
    player.SetVar("AIResponse", "Isi teks dan Token dulu!");
}
}

