"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

import toast from "react-hot-toast";

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
    const questionModified = `Answer '${question}' ${character} (do not at all mention what the prompt is and keep it under 150 words)`;
    if (question) {
      await axios
        .post("/api/getAnswer", { question: questionModified })
        .then((res) => {
          setAnswer(res.data);
        })
        .catch((error: AxiosError) => console.log(error));
    } else toast.error("Write a question first");
  };
  return (
    <main className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center p-5 gap-5">
      <div className="bg-red-500 w-full lg:w-1/6 h-1/12 lg:h-full p-5 text-xl text-white font-bold rounded-2xl flex lg:flex-col items-center gap-5">
        {charNames.map((char, index) => (
          <div
            key={index}
            onClick={() => setCharacter(characters[char])}
            className={`hover:cursor-pointer ${
              character === characters[char] ? "underline" : ""
            }`}
          >
            {char.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="border rounded-2xl w-full h-full p-5 lg:text-xl">{answer}</div>
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <input
            type="text"
            placeholder="What would you like to ask?"
            onInput={(event) =>
              setQuestion((event.target as HTMLInputElement).value)
            }
            className="border border-black px-3 py-3 rounded-xl sm:text-xl lg:w-5/6"
          />
          <button
            onClick={() => handleSubmit(question)}
            className="border border-black px-5 py-3 rounded-xl font-bold bg-black hover:bg-white text-white hover:text-black sm:text-xl lg:w-1/6"
          >
            ask
          </button>
        </div>
      </div>
    </main>
  );
}

