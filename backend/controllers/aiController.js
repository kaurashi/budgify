const OpenAI = require("openai");

const client = new OpenAI({
  
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const getInsights = async (req, res) => {
  try {
    const expenses = req.body?.expenses;

    if (!Array.isArray(expenses) || expenses.length === 0) {
      return res.status(400).json({
        error: "Invalid expenses payload",
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a financial assistant.",
        },
        {
          role: "user",
            content: `
Analyze the following expenses and respond STRICTLY in this format:

📊 INSIGHTS (3 points)
Provide exactly 3 short bullet points about the user's spending habits.
Each line must start with one emoji (💡📉📊💰🔥).
Use "you" in every sentence.
Maximum one line per insight.
Focus on trends, patterns, or unusual observations.

💰 SAVING TIPS (2 points)
Provide exactly 2 practical saving tips.
Each line must start with one emoji (💡💰🪙📉).
Suggestions should be realistic and easy to follow.

🚨 UNUSUAL SPENDING
Mention only if an unusually large expense or category is detected.
Start with 🚨.
If no unusual spending is found, write:
✅ No unusual spending detected.

📈 FINANCIAL HEALTH SCORE
Give a score out of 100.
Format:
⭐ Financial Health Score: XX/100
After the score, provide exactly one short sentence explaining the score.

🎯 PERSONALIZED CHALLENGE
Suggest one small financial goal based on the user's spending.
Start with 🎯.
Keep it under one sentence.

RULES:
- No paragraphs
- No explanations
- Only bullet points
- Always include emojis
- Keep it very short and dashboard-friendly

EXPENSE DATA:
${JSON.stringify(expenses)}
          `,
        },
      ],
      temperature: 0.7,
    });

    const insights = completion.choices[0].message.content;

    return res.json({
      insights,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getInsights };