"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (question: string) => {
    const questionModified = 
    `Answer '${question}' like me and you are a toddler. (Just give answer please and do not mention the toddler thing and make it silly)`
    await axios
      .post("/api/getAnswer", { question: questionModified })
      .then((res) => {
        setAnswer(res.data);
      })
      .catch((error: AxiosError) => console.log(error));
  };
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-5 lg:gap-10 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
        <input type="text" placeholder="What would you like to ask the toddler?" onInput={event => setQuestion((event.target as HTMLInputElement).value)} className="border px-2 py-3 rounded-xl w-[400px]" />
        <button onClick={() => handleSubmit(question)} className="border border-black px-5 py-3 rounded-xl font-bold bg-black hover:bg-white text-white hover:text-black">ask</button>
      </div>
      <div className="border p-5 rounded-2xl lg:w-1/2">{answer}</div>
    </main>
  );
}
