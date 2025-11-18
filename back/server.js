const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let ultimoDato = { temperatura: null, humedad: null, fecha: null };
let comandoBuzzer = "OFF";

app.post('/esp32/data', (req, res) => {
  const { temperatura, humedad } = req.body;
  ultimoDato = { temperatura, humedad, fecha: new Date().toISOString() };

  if (temperatura >= 27) comandoBuzzer = "ON";
  else comandoBuzzer = "OFF";

  res.json({ status: "ok" });
});

app.get('/esp32/buzzer', (req, res) => {
  res.json({ buzzer: comandoBuzzer });
});

app.get('/esp32/ultimo', (req, res) => {
  res.json(ultimoDato);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

