import Link from "next/link";

const Navbar = () => {
   return (
      <>
         <nav>
            <div className="nav-logo">
               <Link href="/" className="logo-flex">
                  <img className="logo" src="/senku-icon.png" alt="logo" />
                  <p className="logo-title">SENKU</p>
               </Link>
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
