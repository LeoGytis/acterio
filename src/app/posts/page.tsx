"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar";

export interface PostProps {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
}

export interface PostDataProps {
	posts: PostProps[];
	total: number;
	skip: number;
	limit: number;
}

export default function Posts() {
	const [postsData, setPostsData] = useState<PostDataProps | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<PostDataProps>("https://dummyjson.com/posts");
				setPostsData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const searchPosts = async (searchWord: string) => {
		try {
			const response = await axios.get<PostDataProps>(`https://dummyjson.com/posts/search?q=${searchWord}`);
			setPostsData(response.data);
		} catch (error) {
			console.error("Error searching posts:", error);
		}
	};

	const handleDelete = async (postId: number) => {
		const updatedPosts = postsData?.posts.filter((post) => post.id !== postId);
		if (updatedPosts) {
			setPostsData((prevState: PostDataProps | null) => ({
				...(prevState as PostDataProps),
				posts: updatedPosts,
				total: (prevState && prevState.total) || 0,
			}));
		}
	};

	return (
		<>
			<SearchBar onSearch={searchPosts} />
			<main className="min-h-screen max-w-screen-xl grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center p-8">
				{postsData?.posts.map((item) => (
					<CardWrapper
						key={item.id}
						id={item.id}
						title={item.title}
						body={item.body}
						userId={item.userId}
						reactions={item.reactions}
						tags={item.tags}
						onDelete={() => handleDelete(item.id)}
					/>
				))}
			</main>
		</>
	);
}
