"use client";
import { useState, useRef } from "react";
import Typewrite from "./components/Typewriter";
import MarkdownDisplay from "./components/MarkdownDisplay";

export default function Home() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = async () => {
		if (!prompt) return;
		setLoading(true);
		setResponse(""); // Önceki cevabı temizle
		setPrompt(""); // Promptu temizle

		try {
			const res = await fetch("/api/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});

			if (!res.ok) throw new Error("API request was unsuccessful.");

			const reader = res.body?.getReader(); // 🔥 Streaming için `getReader()`
			if (!reader) throw new Error("No readable stream available.");

			const decoder = new TextDecoder();
			let resultText = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				resultText += chunk;

				const words = chunk.split(" ");
				words.forEach((word, index) => {
					setTimeout(() => {
						setResponse((prev) => prev + (prev ? " " : "") + word); // Kelime kelime göster
					}, index * 500); // 500ms gecikme (kelime kelime yazdır)
				});
			}
		} catch (error) {
			setResponse("An error occurred.");
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6">
			<div className="text-2xl font-bold mb-4 font-mono">
				<Typewrite
					texts={["How can I help you?", "...", "Promptify"]}
					speed={100}
				/>
			</div>

			<div className="relative w-full max-w-3xl transition-all duration-300 h-[50px]">
				<textarea
					ref={textareaRef}
					className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-zinc-700 border border-zinc-800 hover:border-zinc-600 rounded-lg transition-all duration-100 ease-in-out resize-none bg-zinc-950 pr-25 leading-normal"
					placeholder="Ask me a question..."
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyDown={handleKeyDown}
					style={{
						overflow: "hidden",
						height: "50px",
					}}
				/>
				<button
					className="absolute right-2 top-1/2 -translate-y-1/2 transform border bg-zinc-200 text-zinc-800 rounded-md px-2 py-1 flex items-center z-20 disabled:bg-zinc-900 disabled:border-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out cursor-pointer hover:opacity-85"
					onClick={handleSubmit}
					disabled={!prompt || loading}
					aria-label="Send prompt">
					{loading ? "Loading..." : "Send"}
					<img
						src="/arrow-icon.svg"
						alt="Arrow Icon"
						width={20}
						height={20}
						className={`ml-2 transition-all duration-200 ease-in-out ${
							!prompt || loading
								? "opacity-25"
								: "opacity-100 invert"
						}`}
					/>
				</button>
			</div>

			{response && (
				<div className="mt-6 p-4 rounded-lg w-full max-w-3xl text-white">
					{response}
				</div>
			)}
		</div>
	);
}
