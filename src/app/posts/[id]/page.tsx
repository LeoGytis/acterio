"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import { PostProps } from "../page";
import SearchBar from "../components/SearchBar";

export default function PostPage({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<PostProps | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<PostProps>(`https://dummyjson.com/posts/${params.id}`);
				setPost(response.data);
			} catch (error: any) {
				setError(error);
				console.error("Error fetching data:", error);
				setMessage("Error fetching data.");
			}
		};

		fetchData();
	}, [params]);

	const handleReactionClick = async () => {
		try {
			const updatedReactions = (post?.reactions ?? 0) + 1;

			const response = await axios.put(`https://dummyjson.com/posts/${params.id}`, {
				reactions: updatedReactions,
			});
			setPost(response.data);
			setMessage("You've reacted to this post!");
		} catch (error: any) {
			console.error("Error updating reactions:", error);
		}
	};

	if (!post) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<p className="animate-bounce">Loading...</p>
			</div>
		);
	}

	if (error)
		return (
			<div className="min-h-screen flex justify-center items-center">
				{/* @ts-ignore */}
				<p className="text-red-600">{error.message}</p>
			</div>
		);

	return (
		<>
			<SearchBar searchPostMessage={message} />
			<main className="h-screen w-full md:w-1/2 lg:w-1/4 flex justify-center pt-10 px-4">
				<CardWrapper
					key={post.id}
					id={post.id}
					title={post.title}
					body={post.body}
					userId={post.userId}
					reactions={post.reactions}
					tags={post.tags}
					onReactionClick={handleReactionClick}
				/>
			</main>
		</>
	);
}
