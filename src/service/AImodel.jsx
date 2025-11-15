import Groq from "groq-sdk";

export const chatSession = async (prompt) => {
  try {
    const client = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const FINAL_SYSTEM_PROMPT = `
You are an AI that generates trip plans. 
You MUST ALWAYS return ONLY valid pure JSON. 
No text, no explanation, no formatting, no markdown, no backticks.

Return JSON exactly in this format:

{
  "hotels": [
    {
      "name": "",
      "address": "",
      "description": "",
      "rating": 0,
      "price_per_night": "",
      "image_url": "",
      "geo_coordinates": {
        "lat": 0,
        "lon": 0
      }
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "schedule": [
        {
          "place_name": "",
          "place_details": "",
          "best_time_to_visit": "",
          "estimated_time_spent_minutes": 0,
          "ticket_pricing": "",
          "image_url": "",
          "geo_coordinates": {
            "lat": 0,
            "lon": 0
          }
        }
      ]
    }
  ]
}

RULES:
- ALWAYS return valid JSON.
- NEVER include backticks.
- NEVER include explanations.
- All numbers must be actual numbers (no quotes).
`;



    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b", 
      messages: [
  {
    role: "system",
    content: FINAL_SYSTEM_PROMPT,
  },
  {
    role: "user",
    content: prompt,
  },
],
      max_tokens: 8000,
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq ERROR:", error);
    throw error;
  }
};
