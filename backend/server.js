const express = require("express");
const db = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware pour lire le JSON
app.use(express.json());

//Route de test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur StepByDev!🚀" });
});

//Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
