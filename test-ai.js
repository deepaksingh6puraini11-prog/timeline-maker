const { GoogleGenerativeAI } = require("@google/generative-ai");

// Aapki key (Jo aapne bheji thi)
const genAI = new GoogleGenerativeAI("AIzaSyDi7TAka6OH3nH8k51o6wWcBqsqyTguXmI");

async function run() {
  try {
    console.log("🤖 Testing with model: gemini-1.5-flash ...");
    
    // 👇 Yahan humne naya model name dala hai
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Just say: AI is working!");
    console.log("✅ SUCCESS! Jawab aaya:", result.response.text());
    
  } catch (error) {
    console.log("❌ FAILURE! Error details:");
    console.log(error.message);
  }
}

run();