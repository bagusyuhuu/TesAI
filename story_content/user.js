function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5bDiSeqGfkr":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");

// Gunakan URL lengkap Vercel kamu
var fullUrl = "https://tes-ai-seven.vercel.app/api/proxy"; 

fetch(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: userMessage })
})
.then(response => {
    if (!response.ok) throw new Error("Server Error: " + response.status);
    return response.json();
})
.then(data => {
    // Debugging: Kita lihat apa yang sebenarnya dikembalikan Hugging Face
    console.log("Data diterima:", data);

    // Cek apakah responnya error dari Hugging Face
    if (data.error) {
        player.SetVar("AIResponse", "AI sedang loading, coba lagi...");
        return;
    }

    // Terkadang Hugging Face mengembalikan array dalam array [[{label: "...", score: ...}]]
    // Kita buat pengambilan datanya lebih fleksibel
    var result = (Array.isArray(data[0])) ? data[0][0] : data[0];
    
    if (result && result.label) {
        player.SetVar("AIResponse", result.label);
    } else {
        player.SetVar("AIResponse", "Format data tidak dikenal");
    }
})
.catch(error => {
    console.error("Error Detail:", error);
    player.SetVar("AIResponse", "Gagal: " + error.message);
});
}

