import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Loader } from "../components/Loader/Loader";

export default function Post() {
	const [blogPost, setBlogPost] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();
	const {
		query: { post },
	} = router;

	const getPost = async () => {
		try {
			const res = await fetch('https://dev.june-react-workshop.sandbox7.cliquedomains.com/api/posts/' + post);
			const data = await res.json();
			setBlogPost(data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(true);
		}
	}

	useEffect(() => {
		getPost();
	}, [post]);
	
	if (isLoading){
        return (
           <Loader />
        );
	}
	
	return (
		<div className="post__container">
			<h1>{blogPost.title}</h1>
			<p className="post-created">Posted: {new Date(blogPost.created_at).toLocaleDateString()}</p>
			{blogPost.created_at !== blogPost.updated_at &&
				<p className="post-updated">Updated: {new Date(blogPost.updated_at).toLocaleDateString()}</p>
			}
			<p className="post-body">{blogPost.body}</p>
		</div>
	);
}