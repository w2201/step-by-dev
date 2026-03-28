const Database = require("better-sqlite3");
const path = require("path");

// Chemin vers le fichier de la base de données
const dbPath = path.join(__dirname, "../data/stepbydev.db");

// Connexion à la base de données
const db = new Database(dbPath);

// Activation des clés étrangères
db.pragma("foreign_keys = ON");

// Création des tables
db.exec(`

  -- Table utilisateurs
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'apprenant',
    langue TEXT DEFAULT 'fr',
    verified INTEGER DEFAULT 0,
    date_inscription TEXT DEFAULT (datetime('now'))
  );

  -- Table parcours
  CREATE TABLE IF NOT EXISTS parcours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT,
    duree_semaines INTEGER
  );

  -- Table modules
  CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parcours_id INTEGER NOT NULL,
    titre TEXT NOT NULL,
    ordre INTEGER,
    FOREIGN KEY (parcours_id) REFERENCES parcours(id)
  );

  -- Table leçons
  CREATE TABLE IF NOT EXISTS lecons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER NOT NULL,
    titre TEXT NOT NULL,
    contenu TEXT,
    ordre INTEGER,
    FOREIGN KEY (module_id) REFERENCES modules(id)
  );

  -- Table progression
  CREATE TABLE IF NOT EXISTS progression (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lecon_id INTEGER NOT NULL,
    completee INTEGER DEFAULT 0,
    date_completion TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lecon_id) REFERENCES lecons(id)
  );

  -- Table traductions
  CREATE TABLE IF NOT EXISTS translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_cible TEXT NOT NULL,
    id_cible INTEGER NOT NULL,
    langue TEXT NOT NULL,
    champ TEXT NOT NULL,
    valeur TEXT NOT NULL
  );

  -- Table badges
  CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    condition TEXT
  );

  -- Table user_badges
  CREATE TABLE IF NOT EXISTS user_badges (
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    date_obtention TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, badge_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (badge_id) REFERENCES badges(id)
  );

`);

console.log("✅ Base de données connectée et tables créées");

module.exports = db;
