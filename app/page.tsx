"use client";
import { useState } from "react";

import Prompt from "./components/layout/Prompt";
import Header from "./components/layout/Header";
import Response from "./components/layout/Response";

export default function Home() {
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSendPrompt = async (prompt: string) => {
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
			<Header />
			<Prompt onSend={handleSendPrompt} loading={loading} />{" "}
			<Response response={response} />
		</div>
	);
}
