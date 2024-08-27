'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    const isProfilePage = pathname?.includes("/profile")
    const isHelpPage = pathname?.includes("/help")


    return (
        <nav className="w-full flex justify-center mt-6 mb-20 text-white font-semibold">
            <div className="flex justify-evenly w-4/12 bg-slate-600 p-2 rounded">
                {(isProfilePage || isHelpPage) && (
                    <Link
                        href={"/"}
                        className="hover:bg-slate-900 p-2 rounded"
                    >
                        Go to home page
                    </Link>
                )}
                {!isProfilePage && (
                    <Link
                        href={"/profile"}
                        className="hover:bg-slate-900 p-2 rounded"
                    >
                        Go to profile page
                    </Link>
                )}
                {!isHelpPage && (
                    <Link
                        href={"/help"}
                        className="hover:bg-slate-900 p-2 rounded"
                    >
                        Go to help page
                    </Link>
                )}
            </div>
        </nav>
    )
}