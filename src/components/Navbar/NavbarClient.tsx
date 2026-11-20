"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Session } from 'next-auth'
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
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"
import { signOut, useSession } from 'next-auth/react'
import { GetCartCountAction } from '@/app/Action/cartaction'

// NAV_LINKS: لينكات الناف بار، مكتوبة مرة واحدة وبتستخدم في الكمبيوتر والموبايل
const NAV_LINKS = [
    { href: "/product", label: "Products" },
    { href: "/brand", label: "Brands" },
    { href: "/categories", label: "Categories" },
]

export default function NavbarClient() {

    const path = usePathname()
    const [open, setopen] = useState(false);
    const [hidden, sethidden] = useState(false);
    const [cartNum, setcartNum] = useState(0);
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

    // عدد الكارت: بنجيبه من المتصفح أول ما نعرف إن المستخدم عامل لوجين
    // قبل كده كان بيتجاب على السيرفر، وده كان بيخلي كل صفحات الموقع تتعمل من الأول مع كل زيارة
    useEffect(() => {
        if (!session) return
        GetCartCountAction().then(setcartNum)
    }, [session])

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

    // header: بيستخبى وانت نازل في الصفحة وبيرجع وانت طالع
    return <motion.header
        initial={false}
        animate={hidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={
            hidden
                ? { duration: .5, ease: "easeInOut" } // الاختفاء براحه
                : { duration: .2, ease: "easeOut" }  // الرجوع سريع وناعم
        }
        className=" fixed top-0 z-50 w-full"
    >
        {/* nav: الناف بار بيظهر على طول من السيرفر، من غير ما يستنى JavaScript عشان يعمل fade */}
        <nav aria-label="Main" className="fixed z-999 bg-blue-950 text-white w-full shadow-sm shadow-blue-950">
            <div className="container mx-auto px-5  py-3 flex items-center">
                <div className="   flex w-full items-center">
                    {/* اللوجو مش عنوان، فبقى div بدل h2 عشان ترتيب العناوين في الصفحة يبقى صح */}
                    <div className="text-3xl font-bold font-heading">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition">
                                <ShoppingBag size={20} aria-hidden="true" />
                            </div>

                            <span className="text-2xl font-bold tracking-tight">
                                Shop<span className="text-blue-400">Hub</span>
                            </span>
                        </Link>
                    </div>
                    {/* Nav Links */}
                    <ul className=' hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12'>
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={`hover:text-blue-300 transition ${path === link.href ? "text-blue-300 " : ""}`}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* Header Icons */}
                    <div className="hidden md:flex items-center space-x-5   ">
                        {session && <>

                            {/* aria-label: اللينك أيقونة بس، فبنكتب اسمه لقارئ الشاشة */}
                            <Link className="hover:text-blue-300 transition" href="/wishlist" aria-label="Wishlist">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>
                            <Link className="flex items-center " href="/cart" aria-label={`Cart, ${cartNum} items`}>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <AccountMenu session={session} />
                    </div>
                </div>
                {/* Responsive navbar */}
                <div className='flex items-center md:hidden gap-4'>
                    <AccountMenu session={session} />

                    {/* زرار المنيو بقى button حقيقي، فبيشتغل بالكيبورد وقارئ الشاشة بيقول هو مفتوح ولا لأ */}
                    <button
                        type="button"
                        onClick={() => setopen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className='hover:text-blue-300 transition md:hidden cursor-pointer'
                    >
                        {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-blue-950 border-t border-blue-900 absolute top-full left-0 w-full"
                        >
                            <ul className="flex flex-col text-center py-6 space-y-6 font-semibold">

                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            className={`hover:text-blue-300 transition ${path === link.href ? "text-blue-300" : ""}`}
                                            onClick={() => setopen(false)}
                                            href={link.href}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

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
        </nav>
    </motion.header>;
}

// AccountMenu: منيو الحساب، كانت مكتوبة مرتين (كمبيوتر وموبايل) فبقت كومبوننت واحد
function AccountMenu({ session }: { session: Session | null }) {
    return (
        <DropdownMenu>
            {/* الزرار: كان svg لوحده، والـ svg مش بيتداس بالكيبورد وملوش اسم، فبقى button جواه الأيقونة */}
            <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Account menu" className="cursor-pointer rounded hover:text-blue-300 transition focus-visible:outline-2 focus-visible:outline-blue-400">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </DropdownMenuTrigger>
            {/* asChild: العنصر نفسه بيبقى هو اللينك، بدل لينك جواه عنصر، فالأسهم في الكيبورد بتشتغل صح */}
            <DropdownMenuContent>
                {session ? <>
                    <DropdownMenuItem asChild>
                        <Link href={'/profile'}>
                            <UserIcon />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'/allorders'}>
                            <CreditCardIcon />
                            My orders
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({
                        callbackUrl: "/"
                    })} variant="destructive">
                        <LogOutIcon />
                        Log out
                    </DropdownMenuItem>
                </> : <>
                    <DropdownMenuItem asChild>
                        <Link href={'/login'}>
                            <LogInIcon />
                            Login
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'/signup'}>
                            <LogInIcon />
                            Sign-Up
                        </Link>
                    </DropdownMenuItem>
                </>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
