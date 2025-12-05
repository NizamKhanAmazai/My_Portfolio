import React, { useRef, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, MessageSquare, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ... (remaining imports and useState logic)
// --- Contact Section Component (GSAP Golden Enhanced) ---
const ContactSection = () => {
    // ... (Your formData and contactLinks data remain the same) ...

    // --- GSAP REFS ---
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const mainBoxRef = useRef(null);
    const leftColumnRef = useRef(null);
    const linkRefs = useRef([]); // To hold refs for the three CTA cards


    // --- GSAP ANIMATION LOGIC (The Golden Timeline) ---
    useEffect(() => {
        // Ensure all refs are available
        if (!sectionRef.current) return;

        // Timeline for the Contact Section entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                // Triggers when 60% of the section is visible
                start: "top 80%", 
                toggleActions: "play none none none",
            },
            defaults: { duration: 0.8, ease: Power3.easeOut }
        });
        
        // 1. Initial State: Hide all elements
        gsap.set([headingRef.current, mainBoxRef.current], { opacity: 0, y: 50 });
        
        // Hide the children of the left column (p, details, socials)
        gsap.set(leftColumnRef.current.children, { opacity: 0, y: 20 });
        
        // Hide the CTA links (The Golden Boxes) and the title
        gsap.set(linkRefs.current, { opacity: 0, scaleX: 0.8, x: 50 });
        
        // 2. Heading Fade In
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.6 })

        // 3. Main Container Unfurl
        .fromTo(mainBoxRef.current, {
            opacity: 0, 
            y: 50,
            rotationX: -15, // Unfurl from the top
            transformOrigin: "top center"
        }, {
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.3")

        // 4. Left Column Staggered Entrance (Details & Socials)
        .to(leftColumnRef.current.children, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15, // Stagger details for smooth flow
        }, "-=0.5") // Overlap with main box completion

        // 5. Golden CTA Reveal (The Finale)
        // Staggered horizontal expansion and slide-in
        .fromTo(linkRefs.current, {
            opacity: 0,
            scaleX: 0.8, // Start slightly compressed horizontally
            x: 50,
            y: 10,
        }, {
            opacity: 1,
            scaleX: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.15, // Very short stagger for a fast, "flicker" effect
            ease: "back.out(1.7)", // Aggressive, snappy ease
        }, "-=0.3"); // Overlap slightly with the left column to finish strong

    }, []);

    // Function to collect refs for the CTA cards
    const addLinkRef = (el) => {
        if (el && !linkRefs.current.includes(el)) {
            linkRefs.current.push(el);
        }
    };
    
    // Updated data for the CTA links
    const contactLinks = [
        { 
            icon: Linkedin, 
            title: "Connect Professionally", 
            description: "View my full professional history and endorsements on LinkedIn.",
            href: "https://linkedin.com/in/nizam-k-a6149228b",
            color: "bg-cyan-600 hover:bg-cyan-700"
        },
        { 
            icon: Github, 
            title: "Explore My Code", 
            description: "Find all my open-source projects, contributions, and repositories here.",
            href: "https://github.com/NizamKhanAmazai",
            color: "bg-indigo-600 hover:bg-indigo-700"
        },
        { 
            icon: Mail, 
            title: "Send a Direct Email", 
            description: "Click here to open your preferred email client and send me a message.",
            href: "mailto:nizamkhank640@gmail.com",
            color: "bg-purple-600 hover:bg-purple-700"
        },
    ];


    return (
        <section 
            id="contact"
            ref={sectionRef} // Ref for ScrollTrigger
            className=" py-10 sm:py-15 bg-gray-900 text-white p-4 flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto w-full">
                <h2 
                    ref={headingRef}
                    className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
                >
                    Get In Touch
                </h2>

                <div 
                    ref={mainBoxRef} // Ref for the main container animation
                    className="bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl border border-indigo-700/50 grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                    
                    {/* LEFT COLUMN: Contact Information and Social Links */}
                    <div ref={leftColumnRef} className="space-y-8">
                        <p className="text-gray-400 text-lg">
                            Have a project idea or a question? Please reach out using the direct links below. I aim to respond within 24 hours.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <span className="text-lg text-white break-all">nizamkhank640@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <span className="text-lg text-white">(+92) 340 0105107</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <span className="text-lg text-white">Islamabad, Pakistan</span>
                            </div>
                        </div>

                        {/* Social Links (Large Icons) */}
                        <div className="flex space-x-6 pt-4">
                            <a 
                                href="https://github.com/NizamKhanAmazai" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-400 transition duration-300 transform hover:scale-110"
                                aria-label="GitHub Profile"
                            >
                                <Github size={30} />
                            </a>
                            <a 
                                href="https://linkedin.com/in/nizam-k-a6149228b" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-400 transition duration-300 transform hover:scale-110"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={30} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact CTAs (The Golden Boxes) */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">My Preferred Contact Methods</h3>
                        
                        {contactLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <a 
                                    key={index}
                                    ref={addLinkRef} // Collect ref for the Golden animation
                                    href={link.href}
                                    target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className={`flex items-start p-4 rounded-xl transition duration-300 ease-in-out shadow-lg text-white ${link.color} transform hover:scale-[1.02]`}
                                >
                                    <Icon className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-xl font-bold">{link.title}</h4>
                                        <p className="text-sm opacity-80 mt-1">{link.description}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};


// // --- Minimal App Component to wrap and render the ContactSection ---
const Contact = () => {
  return (
        <ContactSection />
  );
};

export default Contact;

