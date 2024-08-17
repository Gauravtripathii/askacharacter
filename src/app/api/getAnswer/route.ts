import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.API_KEY,
});

async function getGroqChatCompletion(question: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Explain '${question}' like I am a toddler. (Just give answer please and do not mention the toddler thing)`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  const answer = [];
  for await (const chunk of chatCompletion) {
    answer.push(chunk.choices[0]?.delta?.content || "");
  }
  return answer.join("");
}

export async function POST(request: Request) {
  const question = await request.text();
  const answer = await getGroqChatCompletion(question);
  return new Response(answer);
}

