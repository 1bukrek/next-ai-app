"use client";
import { useState } from "react";
import Typewrite from "./components/Typewriter";
import MarkdownDisplay from "./components/MarkdownDisplay";
import Prompt from "./components/Prompt"; // Prompt bileşenini içe aktar

export default function Home() {
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSendPrompt = async (prompt: string) => {
		// Prompt bileşeninden promptu alır
		if (!prompt) return;
		setLoading(true);
		setResponse("");

		try {
			const res = await fetch("/api/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});

			if (!res.ok) throw new Error("API request was unsuccessful.");

			const reader = res.body?.getReader();
			if (!reader) throw new Error("No readable stream available.");

			const decoder = new TextDecoder();
			let resultText = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				resultText += chunk;

				setResponse((prev) => prev + chunk);
			}
		} catch (error) {
			console.error("API error:", error);
			setResponse("An error occurred.");
		} finally {
			setLoading(false);
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
			<Prompt onSend={handleSendPrompt} loading={loading} />{" "}
			{response && (
				<div className="mt-6 p-4 rounded-lg w-full max-w-3xl text-white">
					<MarkdownDisplay markdownText={response} />
				</div>
			)}
		</div>
	);
}
