import { useState, useEffect } from 'react';

import Link from "next/link";

export function PostItem({ post }) {
	const [postBody, setPostBody] = useState(post.body);

	const truncate = () => {
		const truncateWords = postBody.split(' ', 20).join(' ').length;

		const truncatedBody = postBody.substring(0, truncateWords) + ' ...';
		setPostBody(truncatedBody);
	}

	useEffect(() => {
        truncate();
	}, []);

    return (
		<div className="home__item">
			<h2>
				<Link as={`/${post.slug}`} href="[post]">
					<a>{post.title}</a>
				</Link>
			</h2>
			<p>{new Date(post.created_at).toLocaleDateString()}</p>
			<p>{postBody}</p>
		</div>
    );
}
