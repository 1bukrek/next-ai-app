import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge"; // ✅ Edge Runtime

const ai = new GoogleGenerativeAI(process.env.API_KEY || "");

export async function POST(req: Request) {
	const { prompt } = await req.json();
	if (!prompt) {
		return NextResponse.json(
			{ error: "Please enter a prompt!" },
			{ status: 400 }
		);
	}

	const encoder = new TextEncoder();

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const model = ai.getGenerativeModel({
					model: "gemini-1.5-flash",
				});

				const result = await model.generateContentStream({
					contents: [{ role: "user", parts: [{ text: prompt }] }],
				});

				for await (const chunk of result.stream) {
					const text = chunk.text();
					controller.enqueue(encoder.encode(text));
				}
			} catch (error) {
				controller.enqueue(encoder.encode("An error occurred!"));
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
}
