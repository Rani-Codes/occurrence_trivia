'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"


export default function Navbar() {
    const pathname = usePathname()
    const isProfilePage = pathname?.includes("/profile")
    const isHelpPage = pathname?.includes("/help")
    const isLeaderboardPage = pathname?.includes("/leaderboard")

    const { user, handleSignIn, handleSignOut } = useAuth();
    const [open, setOpen] = useState(false); // State for the mobile menu

    return (
        <nav className="w-full z-10 top-0 sticky bg-eerieBlack text-floralWhite font-semibold">
            <div className="flex justify-between items-center px-6 py-4 md:px-10">
                {/* Logo */}
                <Link href={'/'}>
                    <Image
                        src="/logo.jpeg"
                        width={60}
                        height={60}
                        alt="Site Logo"
                        className="rounded-3xl"
                    />
                </Link>

                {/* Hamburger icon for mobile */}
                <div className="md:hidden text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                    <HamburgerMenuIcon />
                </div>

                {/* Links (hidden on mobile, visible on larger screens) */}
                <div className="hidden md:flex gap-8 items-center">
                    {(isProfilePage || isHelpPage || isLeaderboardPage) && (
                        <Link href="/" className="hover:bg-blackOlive p-2 rounded">
                            Home page
                        </Link>
                    )}
                    {!isLeaderboardPage && (
                        <Link href="/leaderboard" className="hover:bg-blackOlive p-2 rounded">
                            Leaderboard
                        </Link>
                    )}
                    {!isHelpPage && (
                        <Link href="/help" className="hover:bg-blackOlive p-2 rounded">
                            Help page
                        </Link>
                    )}
                    {!isProfilePage && (
                        <Link href="/profile" className="hover:bg-blackOlive p-2 rounded">
                            Profile page
                        </Link>
                    )}
                    {user ? (
                        <div className="flex items-center gap-2">
                            {user.photoURL && (
                                <Image
                                    src={user.photoURL}
                                    width={30}
                                    height={30}
                                    alt={`${user.displayName}'s profile picture`}
                                    className="rounded-full"
                                />
                            )}
                            <button onClick={handleSignOut} className="hover:bg-blackOlive p-2 rounded">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className="hover:bg-blackOlive p-2 rounded">
                            Sign in with Google
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-eerieBlack text-floralWhite transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col items-center gap-6 py-4">
                    {(isProfilePage || isHelpPage || isLeaderboardPage) && (
                        <Link href="/" className="hover:bg-blackOlive p-2 rounded w-full text-center">
                            Home page
                        </Link>
                    )}
                    {!isLeaderboardPage && (
                        <Link href="/leaderboard" className="hover:bg-blackOlive p-2 rounded w-full text-center">
                            Leaderboard
                        </Link>
                    )}
                    {!isHelpPage && (
                        <Link href="/help" className="hover:bg-blackOlive p-2 rounded w-full text-center">
                            Help page
                        </Link>
                    )}
                    {!isProfilePage && (
                        <Link href="/profile" className="hover:bg-blackOlive p-2 rounded w-full text-center">
                            Profile page
                        </Link>
                    )}
                    {user ? (
                        <div className="flex flex-col items-center gap-2">
                            {user.photoURL && (
                                <Image
                                    src={user.photoURL}
                                    width={30}
                                    height={30}
                                    alt={`${user.displayName}'s profile picture`}
                                    className="rounded-full"
                                />
                            )}
                            <button onClick={handleSignOut} className="hover:bg-blackOlive p-2 rounded">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className="hover:bg-blackOlive p-2 rounded">
                            Sign in with Google
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
