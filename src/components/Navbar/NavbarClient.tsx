"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CreditCardIcon,
    LogInIcon,
    LogOutIcon,
    Menu,
    ShoppingBag,
    UserIcon,
    X,
} from "lucide-react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { signOut, useSession } from 'next-auth/react'


export default function NavbarClient({ serverCartNum }: { serverCartNum?: number  }) {

    const path = usePathname()
    const [open, setopen] = useState(false);
    const [hidden, sethidden] = useState(false);
    const [cartNum, setcartNum] = useState(serverCartNum ?? 0);
    const { data: session } = useSession()
    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous! && latest > 10) {
            sethidden(true)
        } else {
            sethidden(false)
        }

    })
    useEffect(() => {
        

        function handleCart(e: Event) {
            const customEvent = e as CustomEvent
            setcartNum(customEvent.detail)
        }

        window.addEventListener("cartupdate", handleCart as EventListener)

        return () => {
            window.removeEventListener("cartupdate", handleCart as EventListener)
        }
    }, [])
    return <div>
        <motion.nav
            initial={{ y: 0, opacity: 1 }}
            animate={hidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={
                hidden
                    ? { duration: .5, ease: "easeInOut" } // الاختفاء براحه
                    : { duration: .2, ease: "easeOut" }  // الرجوع سريع وناعم
            }
            className=" fixed top-0 z-50 w-full"
        >


            <AnimatePresence>
                <motion.nav
                    key="navbar-content"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="fixed z-999 bg-blue-950 text-white w-full shadow-sm shadow-blue-950">
                    <div className="container mx-auto px-5  py-3 flex items-center">
                        <div className="   flex w-full items-center">
                            <h2 className="text-3xl font-bold font-heading">

                                <Link href="/" className="flex items-center gap-2 group">
                                    <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition">
                                        <ShoppingBag size={20} />
                                    </div>

                                    <span className="text-2xl font-bold tracking-tight">
                                        Shop<span className="text-blue-400">Hub</span>
                                    </span>
                                </Link>
                            </h2>
                            {/* Nav Links */}
                            <ul className=' hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12'>

                                <li>
                                    <Link href={'/product'} className={`hover:text-blue-300 transition ${path === "/product" ? "text-blue-300 " : ""}`}>product</Link>
                                </li>
                                <li>
                                    <Link href={'/brand'} className={`hover:text-blue-300 transition ${path === "/brand" ? "text-blue-300 " : ""}`}>brand</Link>
                                </li>
                                <li>
                                    <Link href={'/categories'} className={`hover:text-blue-300 transition ${path === "/categories" ? "text-blue-300 " : ""}`}>categories</Link>
                                </li>
                            </ul>
                            {/* Header Icons */}
                            <div className="hidden md:flex items-center space-x-5   ">
                                {session && <>

                                    <Link className="hover:text-blue-300 transition" href="/wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </Link>
                                    <Link className="flex items-center " href="/cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {cartNum > 0 && <span className="flex absolute -mt-5 ml-4">

                                            <motion.span
                                                key={cartNum}
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative text-xs flex justify-center pb-1 rounded-full size-4 bg-pink-500"
                                            >
                                                {cartNum}
                                            </motion.span>
                                        </span>}


                                    </Link>
                                </>}
                                {/* Sign In / Register      */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {session ? <>
                                            <Link href={'/profile'}>

                                                <DropdownMenuItem>
                                                    <UserIcon />
                                                    Profile
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={'/allorders'}>

                                                <DropdownMenuItem>
                                                    <CreditCardIcon />
                                                    My orders
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => signOut({
                                                callbackUrl: "/"
                                            })} variant="destructive">
                                                <LogOutIcon />
                                                Log out
                                            </DropdownMenuItem>
                                        </> : <>
                                            <Link href={'/login'}>
                                                <DropdownMenuItem>
                                                    <LogInIcon />
                                                    Login
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={'/signup'}>
                                                <DropdownMenuItem>
                                                    <LogInIcon />
                                                    Sign-Up
                                                </DropdownMenuItem>
                                            </Link>
                                        </>
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        {/* Responsive navbar */}
                        <div className='flex items-center md:hidden gap-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {session ? <>
                                        <Link href={'/profile'}>

                                            <DropdownMenuItem>
                                                <UserIcon />
                                                Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href={'/allorders'}>

                                            <DropdownMenuItem>
                                                <CreditCardIcon />
                                                My orders
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => signOut({
                                            callbackUrl: "/"
                                        })} variant="destructive">
                                            <LogOutIcon />
                                            Log out
                                        </DropdownMenuItem>
                                    </> : <>
                                        <Link href={'/login'}>
                                            <DropdownMenuItem>
                                                <LogInIcon />
                                                Login
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href={'/signup'}>
                                            <DropdownMenuItem>
                                                <LogInIcon />
                                                Sign-Up
                                            </DropdownMenuItem>
                                        </Link>
                                    </>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {open ? (
                                <>
                                    <X className='hover:text-blue-300 transition md:hidden cursor-pointer ' onClick={() => setopen(!open)} size={24} />
                                </>
                            ) : (
                                <>
                                    <Menu className='hover:text-blue-300 transition md:hidden cursor-pointer ' onClick={() => setopen(!open)} size={24} />
                                </>
                            )}
                        </div>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden bg-blue-950 border-t border-blue-900 absolute top-full left-0 w-full"
                                >
                                    <ul className="flex flex-col text-center py-6 space-y-6 font-semibold">

                                        <li>
                                            <Link
                                                className={`hover:text-blue-300 transition ${path === "/product" ? "text-blue-300" : ""}`}
                                                onClick={() => setopen(false)}
                                                href="/product"
                                            >
                                                Products
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className={`hover:text-blue-300 transition ${path === "/brand" ? "text-blue-300" : ""}`}
                                                onClick={() => setopen(false)}
                                                href="/brand"
                                            >
                                                Brands
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className={`hover:text-blue-300 transition ${path === "/categories" ? "text-blue-300" : ""}`}
                                                onClick={() => setopen(false)}
                                                href="/categories"
                                            >
                                                Categories
                                            </Link>
                                        </li>

                                        {session && (
                                            <>
                                                <li>
                                                    <Link
                                                        className={`hover:text-blue-300 transition ${path === "/wishlist" ? "text-blue-300" : ""}`}
                                                        onClick={() => setopen(false)}
                                                        href="/wishlist"
                                                    >
                                                        Wishlist
                                                    </Link>
                                                </li>

                                                <li>
                                                    {cartNum > 0 && (
                                                        <span className=" bg-pink-500 text-xs rounded-full px-1.5 py-0.5">
                                                            {cartNum}
                                                        </span>
                                                    )}
                                                    <Link
                                                        className={`hover:text-blue-300 transition ${path === "/cart" ? "text-blue-300" : ""}`}
                                                        onClick={() => setopen(false)}
                                                        href="/cart"
                                                    >
                                                        Cart
                                                    </Link>
                                                </li>
                                            </>
                                        )}

                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>


                    </div>
                </motion.nav>
            </AnimatePresence>
        </motion.nav>

    </div>;
}
