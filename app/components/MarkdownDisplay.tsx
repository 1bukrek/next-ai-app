import ReactMarkdown from "react-markdown";

export default function MarkdownDisplay({
	markdownText,
}: {
	markdownText: string;
}) {
	return (
		<div className="markdown-container">
			<ReactMarkdown>{markdownText}</ReactMarkdown>
		</div>
	);
}
