"use client";

import Logo from "./Logo";

const PageTransition = ({ children }) => {
   return (
      <>
         <div className="page-overlay"></div>
         <div className="logo-overlay">
            <div className="logo-container">
               <Logo />
            </div>
         </div>
         {children}
      </>
   );
};
export default PageTransition;
