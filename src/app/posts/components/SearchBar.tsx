"use client";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SearchBarProps {
	onSearch?: (searchWord: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchWord, setSearchWord] = useState("");
	const [errorMessage, setErrorMessage] = useState(""); // New state for error message
	const router = useRouter();

	const pathname = usePathname();
	const isPostPage = pathname == `/posts`;

	const goBack = () => {
		router.back();
	};

	const handleSearch = () => {
		if (searchWord.trim() === "") {
			setErrorMessage("Please enter a search word.");
			return;
		}
		if (searchWord.length > 16) {
			setErrorMessage("Search term should not be longer than 16 characters.");
			return;
		}
		setErrorMessage("");
		if (onSearch) {
			onSearch(searchWord);
		}
	};

	return (
		<nav className="sticky top-0 left-0 z-50 w-full h-16 bg-main shadow-lg">
			<div className="mx-auto max-w-screen-xl h-full flex justify-between items-center text-xs px-10">
				<Image src="/images/logo.svg" width={100} height={100} alt="logo" className="w-36 h-20" />
				{errorMessage && <span className="text-base text-red-500">{errorMessage}</span>}
				{isPostPage ? (
					<div className="blur-animation">
						<input
							type="text"
							value={searchWord}
							onChange={(e) => setSearchWord(e.target.value)}
							placeholder="Search for posts..."
							className="border border-gray-400 rounded-lg placeholder-gray-400 text-black mr-2 px-4 py-2"
						/>
						<button onClick={handleSearch} className="px-4 py-2 bg-secondary hover:bg-hover rounded-lg">
							Search
						</button>
					</div>
				) : (
					<button onClick={goBack} className="px-10 py-3 bg-secondary hover:bg-hover rounded-lg">
						Go Back
					</button>
				)}
			</div>
		</nav>
	);
};

export default SearchBar;
