// Hum library use nahi karenge, seedha Google ke darwaze par dastak denge (Fetch API)
const apiKey = "AIzaSyDi7TAka6OH3nH8k51o6wWcBqsqyTguXmI";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function getModels() {
  console.log("🕵️‍♂️ Jasoosi shuru... Google se list maang rahe hain...");
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.log("❌ CRITICAL ERROR (Key Problem):");
      console.log(data.error.message);
    } else if (data.models) {
      console.log("✅ GOOD NEWS! Ye models available hain:");
      console.log("-----------------------------------------");
      // Sirf wahi models dikhayenge jo text generate kar sakte hain
      const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      
      if (chatModels.length === 0) {
        console.log("⚠️ List aayi par usme 'generateContent' wala koi model nahi hai.");
      } else {
        chatModels.forEach(m => console.log(`👉 ${m.name}`));
      }
      console.log("-----------------------------------------");
    } else {
      console.log("⚠️ Ajeeb jawab aaya:", data);
    }
  } catch (error) {
    console.log("❌ Network Error:", error.message);
  }
}

getModels();