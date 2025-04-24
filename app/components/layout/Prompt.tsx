// components/Prompt.tsx

"use client";
import React, { useState, useRef } from "react";

interface PromptProps {
	onSend: (prompt: string) => void;
	loading: boolean;
}

const Prompt: React.FC<PromptProps> = ({ onSend, loading }) => {
	const [prompt, setPrompt] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = () => {
		onSend(prompt);
		setPrompt(""); // Promptu temizle
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
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
				{loading ? "Loading..." : "Enter"}
				<img
					src="/arrow-icon.svg"
					alt="Arrow Icon"
					width={20}
					height={20}
					className={`ml-2 transition-all duration-200 ease-in-out ${
						!prompt || loading ? "opacity-25" : "opacity-100 invert"
					}`}
				/>
			</button>
		</div>
	);
};

export default Prompt;
