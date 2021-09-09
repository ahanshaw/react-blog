import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Post() {
	const [blogPost, setBlogPost] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();
	const {
		query: { post },
	} = router

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
           <p>Loading...</p>
        );
	}
	
	return (
		<div className="post__container">
			<h1>{blogPost.title}</h1>
			<p>{new Date(blogPost.created_at).toLocaleDateString()}</p>
			<p>{blogPost.body}</p>
		</div>
	);
}