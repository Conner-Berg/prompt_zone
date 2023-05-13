"use client";

// Allows us to move to the other pages of our application
import Link from "next/link";
// Automatically optimizes images
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	// Mock variable for logged in user
	const isUserLoggedIn = true;

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	// Uncomment useEffect when provider fetching loic is setup
	/* useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		setProviders();
	}, []); */

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="Promptopia Logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop Navigation */}

			{/* See why hidden is not working on small devices 1:05:10 */}
			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>

						<button
							type="button"
							onClick={signOut}
							className="outline_btn"
						>
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								src="/assets/images/logo.svg"
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							/>
						</Link>
					</div>
				) : (
					// To sign in with next-auth, we have to have access to providers
					<>
						{/* TODO Providers will not show up yet, because they have not been fetched */}
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{isUserLoggedIn ? (
					<div className="flex">
						<Image
							src="/assets/images/logo.svg"
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{/* TODO Providers will not show up yet, because they have not been fetched */}
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
