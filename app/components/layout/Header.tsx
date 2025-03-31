import Typewriter from "../Typewriter";

export default function Header() {
	return (
		<div className="text-2xl font-semibold mb-4 font-mono">
			<Typewriter
				texts={["How can I help you?", "...", "Promptify"]}
				speed={100}
			/>
		</div>
	);
}
