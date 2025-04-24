import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function MarkdownDisplay({
	markdownText,
}: {
	markdownText: string;
}) {
	return (
		<div className="prose max-w-none dark:prose-invert">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}>
				{markdownText}
			</ReactMarkdown>
		</div>
	);
}
