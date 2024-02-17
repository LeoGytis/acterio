import Link from "next/link";
import { PostProps } from "../page";
import axios from "axios";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface CardWrapperProps extends PostProps {
	onReactionClick?: () => void;
	onDelete?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
	id,
	title,
	body,
	userId,
	reactions,
	tags,
	onReactionClick,
	onDelete,
}) => {
	const pathname = usePathname();
	const isPostPage = pathname == `/posts/${id}`;

	const handleDelete = async () => {
		try {
			await axios.delete(`https://dummyjson.com/posts/${id}`);
			if (onDelete) {
				onDelete();
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};
	return (
		<div className="max-h-[540px] flex flex-col justify-between bg-card_color hover:bg-hover shadow-lg rounded-2xl p-6">
			<div>
				<Link href={`/posts/${id}`}>
					<div className="font-bold text-xl mb-6 text-secondary hover:underline">{title}</div>
				</Link>
				<p className="text-sm mb-6">{body}</p>

				<div className="flex flex-col gap-2 justify-between text-md font-semibold">
					<div className="flex flex-col gap-2 sm:flex-row">
						{tags.map((tag) => (
							<span key={tag} className="border border-secondary rounded-lg px-2 font-light">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-8 ">
				<div className="font-light ml-2">
					<div>
						User ID:&nbsp;
						<span>{userId}</span>
					</div>
					<div>
						Reactions:&nbsp;
						<span>{reactions}</span>
					</div>
				</div>
				{isPostPage ? (
					<button
						onClick={onReactionClick}
						className="bg-main hover:bg-card_color rounded-lg hover:shadow-lg px-8 py-2 mt-2"
					>
						React!
					</button>
				) : (
					<button
						onClick={handleDelete}
						className="bg-main hover:bg-card_color rounded-lg hover:shadow-lg px-8 py-2 mt-2"
					>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default CardWrapper;
