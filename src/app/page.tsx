import Image from "next/image";

export default function Home() {
	return (
		<main className="relative min-h-screen flex flex-col items-center justify-between p-24">
			<Image src="/images/hero_img.png" width={1000} height={1000} alt="logo" className="w-full h-full" />
			<a
				href="/posts"
				className="absolute top-[10%] left-[15%] z-5 flex items-center justify-center bg-secondary hover:bg-hover rounded-lg px-10 py-4"
			>
				<div>Go To Posts</div>
			</a>
		</main>
	);
}
