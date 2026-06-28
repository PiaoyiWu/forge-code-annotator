import Link from "next/link";
// use link not <a> so the entire website doesnt get re renedered every tiome someone clicks a navlink

export default function Navbar() {
    return (
        <nav className="flex p-4 border-b shadow-md">
            <div className="ml-auto flex gap-4 pr-10">
            <Link href="/">HOME</Link>
            <Link href="/code">CODE</Link>
            <Link href="/tools">TOOLS</Link>
            <Link href="/electrical">ELECTRICAL</Link>

            </div>
        </nav>
    );
}