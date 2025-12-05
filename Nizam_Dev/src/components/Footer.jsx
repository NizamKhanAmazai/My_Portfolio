import React, { useRef, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
// --- Footer Section Component (GSAP Golden Enhanced) ---
const FooterSection = () => {
    const currentYear = new Date().getFullYear();
    
    // --- GSAP REFS ---
    const footerRef = useRef(null);
    const mainGridRef = useRef(null);
    const columnRefs = useRef([]); // Refs for the 4 main columns
    const socialIconRefs = useRef([]); // Refs for the 3 social icons
    const bottomBarRef = useRef(null);

    // --- GSAP ANIMATION LOGIC (The Golden Timeline) ---
    useEffect(() => {
        if (!footerRef.current) return;

        // Timeline for the Footer entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                // Triggers when 60% of the footer is visible
                start: "top 60%", 
                toggleActions: "play none none none",
            },
            defaults: { duration: 0.8, ease: Power3.easeOut }
        });

        // 1. Initial State: Hide all elements
        gsap.set(mainGridRef.current, { opacity: 0, scaleY: 0.8, transformOrigin: "bottom center" });
        gsap.set(columnRefs.current, { opacity: 0, y: 30 });
        gsap.set(socialIconRefs.current, { opacity: 0, scale: 0.5 });
        gsap.set(bottomBarRef.current, { opacity: 0 });

        // 2. Main Grid Curtain Reveal (The Anchor Effect)
        tl.to(mainGridRef.current, {
            opacity: 1, 
            scaleY: 1, 
            duration: 1.0,
            ease: "power3.out"
        })

        // 3. Staggered Columns Slide Up
        .to(columnRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15, // Staggered reveal for a flow from left-to-right
        }, "-=0.5") // Overlap with the curtain reveal

        // 4. Social Ripple (Golden Detail)
        .to(socialIconRefs.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1, // Quick, consecutive ripple
            ease: "back.out(2.5)", // Strong, bouncy zoom
        }, "-=0.2") // Overlap slightly with the columns

        // 5. Final Bottom Bar Fade In
        .to(bottomBarRef.current, {
            opacity: 1,
            duration: 0.4,
        }, "-=0.3"); // Overlap slightly
        

    }, []);

    // Quick links for navigation
    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    // Social media links
    const socialLinks = [
        { icon: Github, href: "https://github.com/NizamKhanAmazai", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/nizam-k-a6149228b", label: "LinkedIn" },
        { icon: Mail, href: "mailto:nizamkhank640@gmail.com", label: "Email" },
    ];

    const addColumnRef = (el) => {
        if (el && !columnRefs.current.includes(el)) {
            columnRefs.current.push(el);
        }
    };

    return (
        <footer 
            ref={footerRef} // Ref for ScrollTrigger
            className="bg-gray-800 border-t border-indigo-700/50 py-10 sm:py-12 text-white"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Footer Grid */}
                <div 
                    ref={mainGridRef} // Ref for the Curtain Reveal
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8"
                >
                    
                    {/* Column 1: Logo/Title - Ref Added */}
                    <div ref={addColumnRef} className="col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Nizam.Dev
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                            Building responsive and high-performance web experiences.
                        </p>
                    </div>

                    {/* Column 2: Quick Links - Ref Added */}
                    <div ref={addColumnRef}>
                        <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        target='_blank'
                                        className="text-gray-400 hover:text-indigo-400 transition duration-150 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Media - Ref Added */}
                    <div ref={addColumnRef}>
                        <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <a 
                                        key={link.label}
                                        ref={el => socialIconRefs.current[index] = el} // Ref for Ripple
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-cyan-400 transition duration-300 transform hover:scale-110"
                                        aria-label={link.label}
                                    >
                                        <Icon size={24} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                     {/* Column 4: Placeholder/Extra - Ref Added to maintain 4 columns for consistent stagger */}
                     {/* <div ref={addColumnRef}>
                         <h4 className="text-lg font-semibold text-white mb-3">WhatsApp</h4>
                         <p className="text-sm text-gray-400"> </p>
                         <p className="text-sm text-gray-400">Message Me On Whatsapp</p> 
                     </div>*/}
                </div>

                {/* Bottom Bar: Copyright and Scroll Up - Ref Added */}
                <div 
                    ref={bottomBarRef}
                    className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500"
                >
                    <p>&copy; {currentYear} Nizam. All rights reserved.</p>
                    
                    <a 
                        href="#home"
                        className="mt-4 sm:mt-0 flex items-center space-x-1 text-indigo-400 hover:text-cyan-400 transition duration-300 group"
                    >
                        <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
                        <span>Back to Top</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
// --- Minimal App Component to wrap and render the FooterSection ---

const Footer = () => {
  return ( 
        <FooterSection /> 
  );
};
export default Footer
















































































// import React from 'react';
// import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

// // --- Footer Section Component ---
// const FooterSection = () => {
//     // Current year for copyright
//     const currentYear = new Date().getFullYear();

//     // Quick links for navigation
//     const quickLinks = [
//         { name: "Home", href: "#home" },
//         { name: "About", href: "#about" },
//         { name: "Skills", href: "#skills" },
//         { name: "Projects", href: "#projects" },
//         { name: "Contact", href: "#contact" },
//     ];

//     // Social media links
//     const socialLinks = [
//         { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
//         { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
//         { icon: Mail, href: "mailto:rahul.dev@example.com", label: "Email" },
//     ];

//     return (
//         <footer className="bg-gray-800 border-t border-indigo-700/50 py-10 sm:py-12 text-white">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
//                 {/* Main Footer Grid */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
                    
//                     {/* Column 1: Logo/Title */}
//                     <div className="col-span-2 md:col-span-1">
//                         <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
//                             MyPortfolio
//                         </h3>
//                         <p className="text-sm text-gray-400 mt-2">
//                             Building responsive and high-performance web experiences.
//                         </p>
//                     </div>

//                     {/* Column 2: Quick Links */}
//                     <div>
//                         <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
//                         <ul className="space-y-2">
//                             {quickLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <a 
//                                         href={link.href} 
//                                         className="text-gray-400 hover:text-indigo-400 transition duration-150 text-sm"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Column 3: Social Media */}
//                     <div>
//                         <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
//                         <div className="flex space-x-4">
//                             {socialLinks.map((link) => {
//                                 const Icon = link.icon;
//                                 return (
//                                     <a 
//                                         key={link.label}
//                                         href={link.href}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-gray-400 hover:text-cyan-400 transition duration-300 transform hover:scale-110"
//                                         aria-label={link.label}
//                                     >
//                                         <Icon size={24} />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Bar: Copyright and Scroll Up */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
//                     <p>&copy; {currentYear} Rahul. All rights reserved.</p>
                    
//                     <a 
//                         href="#home"
//                         className="mt-4 sm:mt-0 flex items-center space-x-1 text-indigo-400 hover:text-cyan-400 transition duration-300 group"
//                     >
//                         <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
//                         <span>Back to Top</span>
//                     </a>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// // --- Minimal App Component to wrap and render the FooterSection ---
// const Footer = () => {
//   return ( 
//         <FooterSection /> 
//   );
// };

// export default Footer;