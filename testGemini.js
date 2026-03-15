// Test simple pour vérifier si la clé API est lue
console.log("🔍 Test de lecture de la clé API:");
console.log("REACT_APP_GEMINI_API_KEY =", process.env.REACT_APP_GEMINI_API_KEY);

if (!process.env.REACT_APP_GEMINI_API_KEY) {
  console.log("❌ ERREUR: La clé API n'est pas trouvée!");
  console.log("👉 Vérifie que:");
  console.log("   1. Le fichier .existe à la racine du projet");
  console.log("   2. Le fichier contient: REACT_APP_GEMINI_API_KEY=ta_clé");
  console.log("   3. Tu as redémarré le serveur après avoir créé .env");
} else if (!process.env.REACT_APP_GEMINI_API_KEY.startsWith("AIza")) {
  console.log("❌ ERREUR: La clé API ne commence pas par AIza");
  console.log('👉 Ta clé devrait commencer par "AIza..."');
} else {
  console.log("✅ La clé API est correctement configurée!");
}
