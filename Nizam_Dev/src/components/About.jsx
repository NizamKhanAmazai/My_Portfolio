import React, { useRef, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, ChevronDown, User, Briefcase, Star } from 'lucide-react';
import profile_Image from "../assets/Profile_Image4.png"

gsap.registerPlugin(ScrollTrigger);

// --- About Section Component (Updated ScrollTrigger) ---
const AboutSection = () => {
    // --- GSAP REFS ---
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const mainBoxRef = useRef(null);
    const photoRef = useRef(null);
    const bioTextRef = useRef(null); 
    const cardRefs = useRef([]); 

    // --- GSAP ANIMATION LOGIC ---
    useEffect(() => {
        // Master Timeline for the whole section entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                // --- MODIFIED START PROPERTY ---
                // "top center" means the animation starts when the top of the trigger 
                // hits the center of the viewport. This is close to 50% visibility.
                start: "top center", 
                toggleActions: "play none none none", // Play once and stop
            },
            defaults: { duration: 0.8, ease: Power3.easeOut }
        });

        // 1. Initial State
        gsap.set([
            headingRef.current, 
            mainBoxRef.current, 
            photoRef.current, 
            bioTextRef.current.children,
            ...cardRefs.current
        ], { opacity: 0, y: 50 });

        // 2. Main Sequence
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.6 })

        // 3. Main Container Drop-in (Slight zoom/perspective effect)
        .fromTo(mainBoxRef.current, {
            opacity: 0, 
            scale: 0.98,
            rotationX: 10,
            transformOrigin: "top center"
        }, {
            opacity: 1, 
            scale: 1,
            rotationX: 0,
            duration: 1.0,
        }, "-=0.3")

        // 4. Staggered Bio Elements (Photo and Text)
        .to(photoRef.current, { 
            opacity: 1,
            y: 0,
            duration: 0.7,
            scale: 1,
            ease: "back.out(1.2)"
        }, "-=0.5")

        // Animation for Info Text (<h3> then <p>)
        .to(bioTextRef.current.children, { 
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
        }, "-=0.5") 

        // 5. Card Pop-up 
        const [card1, card2] = cardRefs.current;
        tl.to([card1, card2], {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.4)", 
            stagger: 0.2,
        }, "-=0.4"); 
        
    }, []);

    const addCardRef = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <section 
            id="about"
            ref={sectionRef} 
            className="py-10 sm:py-15 bg-gray-900 text-white p-4"
        >
            <div className="max-w-6xl mx-auto">
                <h2 
                    ref={headingRef}
                    className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
                >
                    About Me
                </h2>

                <div 
                    ref={mainBoxRef}
                    className="bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl border border-indigo-700/50"
                >
                    
                    {/* Top Row: Profile Photo and Short Bio */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-700 pb-8 mb-8">
                        
                        <div ref={photoRef} className="flex-shrink-0">
                            <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center shadow-lg border-2 border-cyan-400">
                                <img src={profile_Image} loading='lazy' className="w-full h-full object-fill rounded-full" />
                            </div>
                        </div>

                        {/* Short Bio Ref */}
                        <div 
                            ref={bioTextRef}
                            className="text-center md:text-left flex-grow"
                        >
                            <h3 className="text-3xl font-bold text-indigo-300 mb-3">Nizam Khan, The Full Stack Developer</h3>
                            <p className="text-gray-400 text-lg">
                                I am a passionate Full Stack Developer who enjoys building smooth, scalable, and user-focused web applications. I work across both frontend and backend technologies, creating intuitive interfaces with React and developing reliable server-side logic and APIs. I care about clean, efficient code and continuously improving my skills to deliver end-to-end solutions that provide great user experiences.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row: Experience and Uniqueness */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        <div 
                            ref={addCardRef} 
                            className="p-6 bg-gray-700/50 rounded-xl border border-gray-600"
                        >
                            <Briefcase className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-4">Experience & Skills</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <strong className="text-indigo-300">Projects & Hands-On Development:</strong> Built multiple full-stack web applications using React for the frontend and Node.js/Express for the backend. Developed reusable components, API integrations, authentication flows, and database interactions.
                                </li>
                                <li>
                                    <strong className="text-indigo-300">Technology Stack:</strong> Expert in React, Tailwind CSS, JavaScript (ES6+), State Management (Zustand/Redux), and RESTful APIs.
                                </li>
                                <li>
                                    <strong className="text-indigo-300">Focus Areas:</strong> Clean UI/UX implementation, responsive design, performance improvements, and writing maintainable, organized code. Actively learning best practices in architecture and full-stack development..
                                </li>
                            </ul>
                        </div>
                        
                        <div 
                            ref={addCardRef} 
                            className="p-6 bg-gray-700/50 rounded-xl border border-gray-600"
                        >
                            <Star className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-2xl font-semibold text-white mb-4">What Makes Me Unique</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <strong className="text-indigo-300">Product Ownership:</strong> I don't just write code; I think like a product owner, prioritizing features that deliver measurable business value.
                                </li>
                                <li>
                                    <strong className="text-indigo-300">Design Sensitivity:</strong> My background includes graphic design, giving me a keen eye for translating visual concepts into flawless front-end implementations.
                                </li>
                                <li>
                                    <strong className="text-indigo-300">Rapid Prototyping:</strong> Ability to quickly spin up functional prototypes using modern tooling to test ideas and gather feedback efficiently.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

//  --- Minimal App Component to wrap and render the HeroSection and AboutSection ---
const About = () => {
  return ( 
      <AboutSection /> 
  );
};

export default About;