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
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<PostDataProps>("https://dummyjson.com/posts");
				setPostsData(response.data);
				setLoading(false);
			} catch (error) {
				setMessage(`Error fetching data: ${error}`);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const searchPosts = async (searchWord: string) => {
		setLoading(true);
		try {
			const response = await axios.get<PostDataProps>(`https://dummyjson.com/posts/search?q=${searchWord}`);
			setPostsData(response.data);
			if (response.data.posts.length === 0) {
				setMessage("No posts found.");
			} else {
				setMessage(`Found ${response.data.posts.length} post${response.data.posts.length !== 1 ? "s" : ""}.`);
			}
		} catch (error) {
			setMessage(`Error searching posts: ${error}`);
		} finally {
			setLoading(false);
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
			setMessage(`Post was deleted`);
		}
	};

	return (
		<>
			<SearchBar
				onSearch={(searchWord: string) => {
					searchPosts(searchWord);
				}}
				searchPostMessage={message}
			/>
			{loading ? (
				<div className="flex items-center min-h-screen justify-center text-lg text-secondary">
					<p className="animate-bounce">Loading...</p>
				</div>
			) : (
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
			)}
		</>
	);
}
