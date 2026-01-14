const API_KEY = "AIzaSyDCCpwuI3mgYPlhi4mv0uiHxK0q96PflOE"; // Apki Key

async function checkGoogleModels() {
  console.log("🔍 Asking Google for available models...");

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ AVAILABLE MODELS FOR YOUR KEY:");
      console.log("---------------------------------");
      data.models.forEach(model => {
        // Sirf wahi model dikhao jo content generate kar sakte hain
        if (model.supportedGenerationMethods.includes("generateContent")) {
            console.log(`👉 ${model.name.replace("models/", "")}`);
        }
      });
      console.log("---------------------------------");
    } else {
      console.log("❌ ERROR:", data);
    }
  } catch (error) {
    console.error("🔥 Network Error:", error.message);
  }
}

checkGoogleModels();