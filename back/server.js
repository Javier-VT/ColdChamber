const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // para parsear JSON en el body

// Endpoints ejemplo
app.get('/esp32/ultimo', (req, res) => {
  res.json({ temperatura: null, humedad: null, fecha: null });
});

app.post('/esp32/data', (req, res) => {
  const { temperatura, humedad } = req.body;
  console.log("Dato recibido:", temperatura, humedad);
  // lógica que quieras hacer con los datos...
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
