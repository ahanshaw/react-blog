import { useRouter } from 'next/router';

export default function Post() {
	const { query } = useRouter();

	return (
		<div>
			<h1>
				Post <em>{query['post']}</em>
			</h1>
		</div>
	);
}