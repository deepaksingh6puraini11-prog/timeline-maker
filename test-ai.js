const { GoogleGenerativeAI } = require("@google/generative-ai");

// Aapki key seedhe yahan daal kar check karte hain
const genAI = new GoogleGenerativeAI("AIzaSyDi7TAka6OH3nH8k51o6wWcBqsqyTguXmI");

async function run() {
  try {
    console.log("🤖 Testing Key...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say Hello");
    console.log("✅ SUCCESS! AI Response:", result.response.text());
  } catch (error) {
    console.log("❌ FAILURE! Error details:");
    console.log(error.message);
  }
}

run();