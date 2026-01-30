// // import React, { useState } from 'react';
// // import { Zap, Menu, X } from 'lucide-react';

// // export default function Navbar() {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
// //   React.useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 50);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const handleNavigation = (path) => {
// //     window.location.href = path;
// //     setIsMobileMenuOpen(false);
// //   };

// //   const menuItems = [
// //     { label: 'Home', path: '/' },
// //     { label: 'Features', path: '/features' },
// //     { label: 'Predict the Price', path: '/Predict' },
// //     { label: 'Buy', path: '/buy' },
// //     { label: 'Sell', path: '/sell' },
// //   ];

// //   return (
// //     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
// //       isScrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
// //     }`}>
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //         <div className="flex items-center justify-between">
// //           {/* Logo */}
// //           <div className="flex items-center gap-2">
// //             <a href="/" className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50 transition">
// //               <Zap className="w-6 h-6" />
// //             </a>
// //             <a href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition">
// //               AutoGauge AI
// //             </a>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex items-center gap-8">
// //             <a href="/" className="text-sm hover:text-cyan-400 transition">Home</a>
// //             <a href="/features" className="text-sm hover:text-cyan-400 transition">Features</a>
// //             <a href="/Predict" className="text-sm hover:text-cyan-400 transition">Predict the Price</a>
// //             <a href="/buy" className="text-sm hover:text-cyan-400 transition">Buy</a>
// //             <a href="/sell" className="text-sm hover:text-cyan-400 transition">Sell</a>
// //             <a href="/login" className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition inline-block">
// //               Login
// //             </a>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             className="md:hidden p-2 text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
// //           >
// //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Sidebar Menu - Slides from right to left */}
// //       <div
// //         className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-slate-800/50 transform transition-transform duration-500 ease-out z-40 md:hidden ${
// //           isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
// //         }`}
// //       >
// //         {/* Close button inside sidebar */}
// //         <div className="flex justify-end p-4">
// //           <button
// //             onClick={() => setIsMobileMenuOpen(false)}
// //             className="p-2 text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
// //           >
// //             <X size={24} />
// //           </button>
// //         </div>

// //         {/* Mobile Menu Items */}
// //         <div className="flex flex-col gap-2 px-4">
// //           {menuItems.map((item) => (
// //             <a
// //               key={item.path}
// //               href={item.path}
// //               onClick={() => setIsMobileMenuOpen(false)}
// //               className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition duration-300"
// //             >
// //               {item.label}
// //             </a>
// //           ))}
// //         </div>

// //         {/* Divider */}
// //         <div className="my-4 mx-4 h-px bg-slate-800/50"></div>

// //         {/* Mobile Login Button */}
// //         <div className="px-4">
// //           <a
// //             href="/login"
// //             onClick={() => setIsMobileMenuOpen(false)}
// //             className="w-full block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition text-center"
// //           >
// //             Login
// //           </a>
// //         </div>
// //       </div>

// //       {/* Mobile Menu Overlay */}
// //       {isMobileMenuOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
// //           onClick={() => setIsMobileMenuOpen(false)}
// //         ></div>
// //       )}
// //     </nav>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { Zap, Menu, X } from "lucide-react";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const menuItems = [
//     { label: "Home", path: "/" },
//     { label: "Features", path: "/features" },
//     { label: "Predict the Price", path: "/Predict" },
//     { label: "Buy", path: "/buy" },
//     { label: "Sell", path: "/sell" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <a
//               href="/"
//               className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50 transition"
//             >
//               <Zap className="w-6 h-6" />
//             </a>
//             <a
//               href="/"
//               className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition"
//             >
//               AutoGauge AI
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {menuItems.map((item) => (
//               <a
//                 key={item.path}
//                 href={item.path}
//                 className="text-sm hover:text-cyan-400 transition"
//               >
//                 {item.label}
//               </a>
//             ))}

//             {/* Clerk Auth Buttons (Desktop) */}
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition">
//                   Login
//                 </button>
//               </SignInButton>
//             </SignedOut>

//             <SignedIn>
//               <UserButton
//                 appearance={{
//                   elements: {
//                     avatarBox: "w-10 h-10",
//                   },
//                 }}
//               />
//             </SignedIn>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-slate-800/50 transform transition-transform duration-500 ease-out z-40 md:hidden ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Close Button */}
//         <div className="flex justify-end p-4">
//           <button
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="p-2 text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Mobile Menu Items */}
//         <div className="flex flex-col gap-2 px-4">
//           {menuItems.map((item) => (
//             <a
//               key={item.path}
//               href={item.path}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="px-4 py-3 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
//             >
//               {item.label}
//             </a>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="my-4 mx-4 h-px bg-slate-800/50"></div>

//         {/* Clerk Auth Buttons (Mobile) */}
//         <div className="px-4">
//           <SignedOut>
//             <SignInButton mode="modal">
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="w-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition"
//               >
//                 Login
//               </button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <div className="flex justify-center mt-4">
//               <UserButton />
//             </div>
//           </SignedIn>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </nav>
//   );
// }

import React, { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "Predict the Price", path: "/Predict" },
    { label: "Buy", path: "/buy" },
    { label: "Sell", path: "/sell" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-blue-600/30 transition"
            >
              <Zap className="w-6 h-6 text-white" />
            </a>
            <a
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition"
            >
              AutoGauge AI
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition ${
                  isScrolled
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-900 hover:text-blue-600"
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Clerk Auth Buttons (Desktop) */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${
              isScrolled
                ? "text-blue-600 hover:bg-slate-100"
                : "text-blue-600 hover:bg-slate-200/50"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white border-l border-slate-200 shadow-lg transform transition-transform duration-500 ease-out z-40 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Menu</h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 mx-4 h-px bg-slate-200"></div>

        {/* Clerk Auth Buttons (Mobile) */}
        <div className="px-4 space-y-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition"
              >
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex justify-center pt-2">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}