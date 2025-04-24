import MarkdownDisplay from "../MarkdownDisplay";

export default function Response({ response }: { response: string }) {
	return (
		<>
			{response && (
				<div className="border border-zinc-800 mt-6 rounded-lg w-full max-w-3xl p-4 text-white">
					<MarkdownDisplay markdownText={response} />
				</div>
			)}
		</>
	);
}
