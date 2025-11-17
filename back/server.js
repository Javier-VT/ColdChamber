const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let ultimoDato = { temperatura: null, humedad: null, fecha: null };
let comandoBuzzer = "OFF";

app.post('/esp32/data', (req, res) => {
  const { temperatura, humedad } = req.body;
  console.log("Dato recibido del ESP32:", req.body);
  ultimoDato = { temperatura, humedad, fecha: new Date().toLocaleString() };
  if (temperatura >= 27) { comandoBuzzer = "ON"; }
    else { comandoBuzzer = "OFF"; }
  res.json({ status: "ok" });
});

app.get('/esp32/buzzer', (req, res) => {
  res.json({ buzzer: comandoBuzzer });
});

app.get('/esp32/ultimo', (req, res) => {
  res.json(ultimoDato);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
