import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const ai = new GoogleGenerativeAI(process.env.API_KEY || "");

export async function POST(req: Request) {
	const { prompt } = await req.json();
	const { signal } = req; // İptal işaretini al

	if (!process.env.API_KEY) {
		return NextResponse.json(
			{ error: "API key is missing!" },
			{ status: 500 }
		);
	}

	if (!prompt) {
		return NextResponse.json(
			{ error: "Please enter a prompt!" },
			{ status: 400 }
		);
	}

	try {
		const model = ai.getGenerativeModel({
			model: "gemini-2.0-flash",
		});

		const result = await model.generateContentStream({
			contents: [{ role: "user", parts: [{ text: prompt }] }],
		});

		const encoder = new TextEncoder();

		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of result.stream) {
						if (signal?.aborted) {
							// İptal isteği geldiyse akışı durdur
							break;
						}
						const text = chunk.text();
						controller.enqueue(encoder.encode(text));
					}
				} catch (error: any) {
					console.error("Gemini API stream error:", error);
					controller.enqueue(
						encoder.encode(
							error.message ||
								"An error occurred during streaming."
						)
					);
				} finally {
					controller.close();
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	} catch (error: any) {
		console.error("Gemini API error:", error);
		return NextResponse.json(
			{ error: error.message || "An unexpected error occurred." },
			{ status: 500 }
		);
	}
}
