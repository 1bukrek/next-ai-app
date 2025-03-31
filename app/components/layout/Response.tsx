import MarkdownDisplay from "../MarkdownDisplay";

export default function Response({ response }: { response: string }) {
	return (
		<>
			{response && (
				<div className="mt-6 p-4 rounded-lg w-full max-w-3xl text-white">
					<MarkdownDisplay markdownText={response} />
				</div>
			)}
		</>
	);
}
