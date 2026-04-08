function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6ftmU17Z7Jx":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");

// Ganti 'YOUR_TOKEN_HERE' dengan API Token dari Hugging Face
var apiToken = "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"; 

// Kita gunakan model klasifikasi sentimen
var modelUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

fetch(modelUrl, {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + apiToken,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userMessage }),
    mode: 'cors' // Tambahkan baris ini
})
.then(response => response.json())
.then(data => {
    // Model ini mengembalikan array berisi label dan score
    // Kita ambil label yang nilainya paling tinggi
    var result = data[0][0].label; // Hasilnya biasanya "POSITIVE" atau "NEGATIVE"
    
    // Kirim kembali ke variabel Storyline
    player.SetVar("AIResponse", result);
})
.catch(error => {
    console.error('Error:', error);
    player.SetVar("AIResponse", "Gagal koneksi");
});
}

