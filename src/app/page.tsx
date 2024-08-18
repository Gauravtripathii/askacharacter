"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

interface charactersType {
  [key: string]: string;
}

const characters: charactersType = {
  toddler:
    "like a toddler in a playful and imaginative way (don't mention the toddler thing)",
  deadpool:
    "like deadpool with a touch of humor (mention the deadpool, just answer)",
};
const charNames: string[] = ["toddler", "deadpool"];

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const [character, setCharacter] = useState("");

  const handleSubmit = async (question: string) => {
    const questionModified = `Answer '${question}' ${character} (do not at all mention what the prompt is)`;
    if (question) {
      await axios
        .post("/api/getAnswer", { question: questionModified })
        .then((res) => {
          setAnswer(res.data);
        })
        .catch((error: AxiosError) => console.log(error));
    }
  };
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center p-5 gap-5">
      <div className="bg-red-500 w-full h-1/12 p-5 text-xl text-white font-bold rounded-2xl flex items-center gap-5">
        {charNames.map((char, index) => (
          <div key={index} onClick={() => setCharacter(characters[char])} className={`hover:cursor-pointer hover:underline`}>
            {char.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="border rounded-2xl w-full h-full p-5">{answer}</div>
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            placeholder="What would you like to ask?"
            onInput={(event) =>
              setQuestion((event.target as HTMLInputElement).value)
            }
            className="border border-black px-3 py-3 rounded-xl"
          />
          <button
            onClick={() => handleSubmit(question)}
            className="border border-black px-5 py-3 rounded-xl font-bold bg-black hover:bg-white text-white hover:text-black"
          >
            ask
          </button>
        </div>
      </div>
    </main>
  );
}
