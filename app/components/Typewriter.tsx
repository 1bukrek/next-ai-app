import { useEffect, useState } from "react";

interface TypewriterProps {
	texts: string[];
	speed?: number;
	deleteSpeed?: number;
	pauseTime?: number;
}

export default function Typewriter({
	texts,
	speed = 500,
	deleteSpeed = 100,
	pauseTime = 8000,
}: TypewriterProps) {
	const [displayedText, setDisplayedText] = useState("");
	const [textIndex, setTextIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		let timeoutId: number;
		const currentText = texts[textIndex];

		if (!isDeleting) {
			// typewriting animation
			if (charIndex < currentText.length) {
				timeoutId = window.setTimeout(() => {
					setDisplayedText(currentText.substring(0, charIndex + 1));
					setCharIndex((prev) => prev + 1);
				}, speed);
			} else {
				// pause time when the writing is over
				timeoutId = window.setTimeout(
					() => setIsDeleting(true),
					pauseTime
				);
			}
		} else {
			// deleting animation
			if (charIndex > 0) {
				timeoutId = window.setTimeout(() => {
					setDisplayedText(currentText.substring(0, charIndex - 1));
					setCharIndex((prev) => prev - 1);
				}, deleteSpeed);
			} else {
				// continue to writing
				setIsDeleting(false);
				setTextIndex((prev) => (prev + 1) % texts.length);
			}
		}

		return () => window.clearTimeout(timeoutId);
	}, [
		charIndex,
		isDeleting,
		textIndex,
		texts,
		speed,
		deleteSpeed,
		pauseTime,
	]);

	return (
		<div className="relative w-full overflow-hidden">
			<span className="whitespace-nowrap">{displayedText}</span>
			<span className="inline-block w-[0.075em] bg-white animate-blink h-5"></span>
			<style jsx global>{`
				@keyframes blink {
					50% {
						opacity: 0;
					}
				}
				.animate-blink {
					animation: blink 1s step-end infinite;
				}
			`}</style>
		</div>
	);
}
