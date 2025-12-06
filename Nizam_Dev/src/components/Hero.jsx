import React, { useState, useEffect } from 'react';
import { gsap, Power3 } from 'gsap'; // <-- Import GSAP
import { Download, Mail, ChevronDown, User } from 'lucide-react';
import profile_Image from "../assets/Profile_Image3.png"
import My_CV from "../assets/my_cv.pdf"


const useTypewriter = (texts) => {
  const [currentText, setCurrentText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];
      
      setCurrentText(
        isDeleting 
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && currentText === fullText) {
        setTypingSpeed(2000); // Pause
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1); // Start next text
        setTypingSpeed(500); // Short pause
      }
    };

    const ticker = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(ticker); // Cleanup timeout
  }, [currentText, isDeleting, loopNum, typingSpeed, texts]);

  return currentText;
};














// ... (rest of the code for useTypewriter hook)
// --- Hero Section Component (GSAP Enhanced) ---
const HeroSection = () => {
    const roles = ["Full Stack Developer", "Frontend Developer", "Backend Developer", "UI/UX Enthusiast", "Problem Solver"];
    const typewriterText = useTypewriter(roles);

    // --- GSAP REFS ---
    const greetingRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const ctaContainerRef = React.useRef(null);
    const imageRef = React.useRef(null);

    // --- GSAP ANIMATION LOGIC ---
    useEffect(() => {
        // Create a master timeline
        const tl = gsap.timeline({ defaults: { ease: Power3.easeOut } });

        // 1. Initial State (Setting elements to invisible/off-screen)
        gsap.set([
            greetingRef.current,
            titleRef.current,
            descriptionRef.current,
            ctaContainerRef.current.children, // Target all children (buttons)
            imageRef.current
        ], { opacity: 0, y: 30 }); // Start them slightly down and invisible

        // NOTE: The typewriter element doesn't need to be set since the hook handles its visibility.

        // 2. Animate the Profile Image (Subtle zoom and fade)
        // Duration: 0.8s
        tl.fromTo(imageRef.current, { scale: 0.9, opacity: 0, y: 0 }, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: Power3.easeInOut
        }, 0.2) // Start slightly after page load

        // 3. Stagger the Text Elements
        // Duration: 0.5s each, with 0.15s gap
        .to(greetingRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2") // Starts slightly before image finishes
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        
        // 4. Animate the Description
        // Duration: 0.6s
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")

        // 5. Animate the CTA Buttons (Staggered fade/slide up)
        // Duration: 0.4s each, staggered by 0.1s
        .fromTo(ctaContainerRef.current.children, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
        }, "-=0.2"); // Overlap slightly with the description fade

    }, []); // Run once on component mount

    return (
        <section 
            id="home" 
            className="flex flex-col items-center justify-center bg-gray-900 relative p-4" 
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 px-4">
                
                {/* LEFT COLUMN: Hero Text and CTAs */}
                <div className="order-2 lg:order-1 text-center lg:text-left">
                    
                    {/* Name: REF ADDED */}
                    <p 
                        ref={greetingRef}
                        className="text-xl sm:text-2xl text-indigo-400 font-semibold mb-3"
                    >
                        Hello, my name is
                    </p>
                    <h1 
                        ref={titleRef}
                        className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 leading-tight mb-4"
                    >
                        Nizam Khan
                    </h1>
                    
                    {/* Role (Typewriter) - No GSAP animation needed here, the hook handles it. */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-200 min-h-[3rem] sm:min-h-[4rem] mb-6">
                        <span className="text-indigo-300">I am </span> 
                        <span className="text-cyan-400 border-r-4 border-cyan-400 pr-1">{typewriterText}</span>
                    </h2>

                    {/* Description: REF ADDED */}
                    <p 
                        ref={descriptionRef}
                        className="mt-4 text-lg sm:text-xl text-gray-400 max-w-xl lg:max-w-full mx-auto lg:mx-0"
                    >
                        I build modern, responsive, and high-performing web applications. I focus on clean code and exceptional user experience.
                    </p>
                    
                    {/* Call to Action Buttons: REF ADDED */}
                    <div 
                        ref={ctaContainerRef}
                        className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <a 
                            href="#contact"
                            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Contact Me
                        </a>
                        <a 
                            href={My_CV} 
                            download
                            className="flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download CV
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN: Profile Image Placeholder: REF ADDED */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end ">
                    <img 
                        ref={imageRef}
                        src={profile_Image} 
                        loading='lazy'
                        className="w-64 h-64 sm:w-80 sm:h-80 object-fill text-gray-600 rounded-full shadow-2xl border-7 border-indigo-500/50 transform transition-all duration-500 hover:border-cyan-400/70" 
                    />
                </div>
            </div>

            {/* Scroll Down Indicator */}
            {/* We'll use the existing Tailwind/CSS animation for the chevron for a simple touch */}
            <a 
                href="#about" 
                className="absolute bottom-6 animate-bounce text-indigo-400 p-2 rounded-full hover:text-cyan-400 transition duration-300"
                aria-label="Scroll down to next section"
            >
                <ChevronDown size={32} />
            </a>
        </section>
    );
};

// --- Minimal App Component to wrap and render the HeroSection ---
const Hero = () => {
  return (
    // <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
        <HeroSection />
    // </div>
  );
};

export default Hero;
