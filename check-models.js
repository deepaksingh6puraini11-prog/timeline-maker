const { GoogleGenerativeAI } = require("@google/generative-ai");

// Aapki Key (Direct)
const API_KEY = "AIzaSyDCCpwuI3mgYPlhi4mv0uiHxK0q96PflOE";

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  console.log("🔍 Checking available models...");
  try {
    // Ye function Google se list mangega
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init
    
    // Asli Jaanch (List Models is not directly exposed easily in simple SDK sometimes, 
    // so we try a direct fetch check or standard check if supported)
    
    // Alternate method: Seedha ek simple call karke dekhte hain ki kaunsa chalta hai
    const modelsToCheck = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro"];
    
    for (const modelName of modelsToCheck) {
        console.log(`\n👉 Testing model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`✅ SUCCESS! '${modelName}' is working!`);
            process.exit(0); // Jo pehla chal gaya, wahin ruk jao
        } catch (error) {
            console.log(`❌ Failed: ${error.message.split('[')[0]}`); // Sirf main error dikhao
        }
    }
    
  } catch (error) {
    console.error("🔥 Global Error:", error.message);
  }
}

listModels();