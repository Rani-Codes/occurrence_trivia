'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'

export default function Navbar() {
    const pathname = usePathname()

    const isProfilePage = pathname?.includes("/profile")
    const isHelpPage = pathname?.includes("/help")


    return (
        <nav className="w-full h-full z-10 top-0 sticky flex mb-4 text-floralWhite font-semibold bg-eerieBlack">
            <div className="flex justify-between items-center w-full px-4">
                <div>
                    <Link href={'/'}>
                        <Image
                            src="/logo.jpeg"
                            width={75}
                            height={75}
                            alt="Picture of the author"
                            className="rounded-3xl"
                        />
                    </Link>
                </div>

                <div className="flex gap-10">
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
            </div>
        </nav>
    )
}