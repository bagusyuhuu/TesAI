function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6rAU1xF9Apy":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var userMessage = player.GetVar("UserText");

// Di Vercel, folder /api/ akan otomatis menjadi endpoint URL
fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: userMessage })
})
.then(response => response.json())
.then(data => {
    var sentiment = data[0][0].label;
    player.SetVar("AIResponse", sentiment);
})
.catch(error => {
    player.SetVar("AIResponse", "Gagal lewat Vercel Bridge");
});
}

