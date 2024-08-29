'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'
import { useAuth } from "@/hooks/useAuth"
import GoogleBtn from "./googleBtn"

export default function Navbar() {
    const pathname = usePathname()
    const isProfilePage = pathname?.includes("/profile")
    const isHelpPage = pathname?.includes("/help")

    const { user, handleSignIn, handleSignOut, isUserSignedIn } = useAuth();


    return (
        <nav className="w-full h-full z-10 top-0 sticky flex mb-4 text-floralWhite font-semibold bg-eerieBlack">
            <div className="flex justify-between items-center w-full px-4">
                <div>
                    <Link href={'/'}>
                        <Image
                            src="/logo.jpeg"
                            width={75}
                            height={75}
                            alt="Site Logo"
                            className="rounded-3xl"
                        />
                    </Link>
                </div>

                <div className="flex gap-10 justify-center items-center">
                    {(isProfilePage || isHelpPage) && (
                        <Link
                            href={"/"}
                            className="hover:bg-blackOlive p-2 rounded"
                        >
                            Go to home page
                        </Link>
                    )}
                    {!isProfilePage && (
                        <Link
                            href={"/profile"}
                            className="hover:bg-blackOlive p-2 rounded"
                        >
                            Go to profile page
                        </Link>
                    )}
                    {!isHelpPage && (
                        <Link
                            href={"/help"}
                            className="hover:bg-blackOlive p-2 rounded"
                        >
                            Go to help page
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
                            <button
                                onClick={handleSignOut}
                                className="hover:bg-blackOlive p-2 rounded"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="hover:bg-blackOlive p-2 rounded"
                        >
                            Sign in with google
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
