import { useState, useEffect } from 'react';
import Router from 'next/router'
import { useRouter } from 'next/router';

import { Loader } from "../components/Loader/Loader";
import { PostItem } from "../components/PostItem/PostItem";
import { PostPagination } from "../components/PostPagination/PostPagination";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [paginatedPosts, setPaginatedPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const numberPerPage = 8;
	const totalPages = Math.ceil(posts.length / numberPerPage);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();
	const { query: { page }} = router;

	// get blog posts
	const getPosts = async () => {
		try {
			const res = await fetch('https://dev.june-react-workshop.sandbox7.cliquedomains.com/api/posts');
			const data = await res.json();
			setPosts(data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	}

    useEffect(() => {
		getPosts();
		if (!page) {
			setCurrentPage(1);
		}
	}, [page]);

	// paginate blog posts
	const getPaginatedPosts = () => {
		setPaginatedPosts(posts.slice(currentPage * numberPerPage - numberPerPage, currentPage * numberPerPage));
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}

	const firstPage = () => {
		setCurrentPage(1);
		getPaginatedPosts();
		Router.push(`/?page=1`);
	}

	const lastPage = () => {
		setCurrentPage(totalPages);
		getPaginatedPosts();
		Router.push(`/?page=${totalPages}`);
	}

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
		getPaginatedPosts();
		Router.push(`/?page=${currentPage + 1}`);
	}

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
		getPaginatedPosts();
		Router.push(`/?page=${currentPage - 1}`);
	}

	useEffect(() => {
		setPaginatedPosts(posts.slice(currentPage * numberPerPage - numberPerPage, currentPage * numberPerPage));
	}, [posts, currentPage, numberPerPage]);
	
	if (isLoading){
        return (
          <Loader />
        );
    }

    return (
		<div className="home__list">
			{paginatedPosts.map((post) => {
				return (
					<PostItem key={post.id} post={post} />
				)
			})}
			{totalPages > 1 && <PostPagination firstPage={firstPage} lastPage={lastPage} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} totalPages={totalPages} />}
        </div>
    );
}
