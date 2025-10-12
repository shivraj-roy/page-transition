"use client";

import Logo from "./Logo";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const PageTransition = ({ children }) => {
   const router = useRouter();
   const pathname = usePathname();
   const isTransitioning = useRef(false);
   const overlayRef = useRef(null);
   const logoOverlayRef = useRef(null);
   const logoRef = useRef(null);
   const blockRef = useRef([null]);

   useEffect(() => {
      const createBlock = () => {
         if (!overlayRef.current) return;
         overlayRef.current.innerHTML = "";
         blockRef.current = [];

         const blockCount = 20;
         for (let i = 0; i < blockCount; i++) {
            const block = document.createElement("div");
            block.className = "block";
            overlayRef.current.appendChild(block);
            blockRef.current.push(block);
         }
      };
      createBlock();

      gsap.set(blockRef.current, {
         scaleX: 0,
         transformOrigin: "left",
      });

      if (logoRef.current) {
         const path = logoRef.current.querySelector("path");
         const pathLength = path.getTotalLength();
         gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            fill: "transparent",
         });
      }

      revealPage();
      const handleRouteChange = (url) => {
         if (isTransitioning.current) return;
         isTransitioning.current = true;
         coverPage(url);
      };

      const links = document.querySelectorAll('a[href^="/"]');

      const handleLinkClick = (e) => {
         e.preventDefault();
         const href = e.currentTarget.getAttribute("href");
         const url = new URL(href, window.location.origin).pathname;
         if (url !== pathname) {
            handleRouteChange(url);
         }
      };

      links.forEach((link) => {
         link.addEventListener("click", handleLinkClick);
      });

      return () => {
         links.forEach((link) => {
            link.removeEventListener("click", handleLinkClick);
         });
      };
   }, [router, pathname]);

   const coverPage = (url) => {
      const tl = gsap.timeline({
         onComplete: () => {
            router.push(url);
         },
      });
      tl.to(blockRef.current, {
         scaleX: 1,
         transformOrigin: "left",
         ease: "power2.out",
         stagger: 0.02,
         duration: 0.4,
      }).set(logoOverlayRef.current, { opacity: 1 }, "-=0.2");

      // Only animate the logo path if logoRef.current exists and has a path...
      if (logoRef.current) {
         const path = logoRef.current.querySelector("path");
         if (path) {
            const pathLength = path.getTotalLength();
            tl.set(
               path,
               {
                  strokeDashoffset: pathLength,
                  fill: "transparent",
               },
               "-=0.25"
            )
               .to(
                  path,
                  {
                     strokeDashoffset: 0,
                     ease: "power2.inOut",
                     duration: 2,
                  },
                  "-=0.5"
               )
               .to(
                  path,
                  {
                     fill: "#e3e4d8",
                     ease: "power2.out",
                     duration: 1,
                  },
                  "-=0.5"
               );
         }
      }
      tl.to(logoOverlayRef.current, {
         opacity: 0,
         duration: 0.25,
         ease: "power2.out",
      });
   };

   const revealPage = () => {
      gsap.set(blockRef.current, {
         scaleX: 1,
         transformOrigin: "right",
      });

      gsap.to(blockRef.current, {
         scaleX: 0,
         transformOrigin: "right",
         ease: "power2.out",
         stagger: "0.02",
         duration: 0.4,
         onComplete: () => {
            isTransitioning.current = false;
         },
      });
   };

   return (
      <>
         <div className="transition-overlay" ref={overlayRef}></div>
         <div className="logo-overlay" ref={logoOverlayRef}>
            <div className="logo-container">
               <Logo ref={logoRef} />
            </div>
         </div>
         {children}
      </>
   );
};
export default PageTransition;
