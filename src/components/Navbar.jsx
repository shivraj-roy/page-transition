import Link from "next/link";

const Navbar = () => {
   return (
      <>
         <nav>
            <div className="nav-logo">
               <Link href="/">SENKU</Link>
            </div>
            <div className="nav-links">
               <Link href="/">Home</Link>
               <Link href="/archive">Archive</Link>
               <Link href="/contact">Contact</Link>
            </div>
         </nav>
      </>
   );
};
export default Navbar;
