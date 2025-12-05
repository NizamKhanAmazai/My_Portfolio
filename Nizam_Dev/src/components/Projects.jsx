import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Code } from 'lucide-react';
import GazeWatch_backend from "../assets/GazeWatch_backend.png" 
import GazeWatch_Frontend from "../assets/GazeWatch-Frontend.png" 

gsap.registerPlugin(ScrollTrigger);

// --- Project Card Component (GSAP Enhanced with Alternating Slide) ---
// Note: Added `index` prop
const ProjectCard = React.forwardRef(({ project, index }, ref) => {

    useEffect(() => {
        if (!ref.current) return;

        // Determine the horizontal slide direction based on the index
        // If index is 0, 3, 6 (left column in a 3-col layout), slide from left (x: -100)
        // If index is 1, 4, 7 (middle column), slide straight up (x: 0)
        // If index is 2, 5, 8 (right column), slide from right (x: 100)
        
        const column = index % 3; // Get the column index (0, 1, or 2)
        let initialX = 0;
        let initialRotationY = 0;

        if (column === 0) { // Left Column
            initialX = -100;
            initialRotationY = -15; 
        } else if (column === 2) { // Right Column
            initialX = 100;
            initialRotationY = 15;
        } 
        // Middle column (column === 1) remains at x=0, rotationY=0, just sliding up

        // Timeline for the individual project card entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%", // Triggers when 60% of the box is visible
                toggleActions: "play none none none",
            },
            defaults: { duration: 1.0, ease: "back.out(1.2)" } // Snappy, quality ease
        });

        // High quality animation: Slide, rotate, and fade in
        tl.fromTo(ref.current, {
            opacity: 0, 
            y: 50, 
            x: initialX,
            rotationY: initialRotationY, 
            scale: 0.95 
        }, {
            opacity: 1, 
            y: 0, 
            x: 0,
            rotationY: 0,
            scale: 1,
        });

    }, [ref, index]); // Include index in dependency array

    return (
        <div 
            ref={ref} 
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden 
                       transform transition-all duration-300 hover:scale-[1.02] 
                       hover:shadow-indigo-500/50 border border-gray-700"
        >
            {/* The rest of the ProjectCard JSX remains the same */}
            
            {/* 1. Preview Image Placeholder */}
            <div className="h-48 bg-gray-700 flex items-center justify-center">
                <img 
                    src={project.image} 
                    alt={`Preview of ${project.title}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.style.display = 'none'; 
                        e.target.parentNode.innerHTML = 
                            `<div class="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold bg-gray-700">
                                ${project.title} Preview
                            </div>`;
                    }}
                />
            </div>

            <div className="p-6">
                
                {/* 2. Title */}
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                
                {/* 3. Short Description */}
                <p className="text-gray-400 mb-4 text-base">{project.description}</p>
                
                {/* 4. Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, i) => (
                        <span 
                            key={i} 
                            className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/50"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* 5. Buttons: GitHub | Live Demo */}
                <div className="flex gap-4">
                    <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-150 transform hover:scale-105"
                    >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                    </a>
                    {project.liveDemoUrl && (
                        <a 
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition duration-150 transform hover:scale-105"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
});

// --- Projects Section Component ---
const ProjectsSection = () => {
    // Mock Data for Projects (using the same mock data for consistency)
    const projects = [
        { /* ... project 1 data ... */ title: "E-Commerce Store", techStack: ["React", "JavaScript", "Tailwind CSS", "Context API"], image: GazeWatch_Frontend, githubUrl: "https://github.com/NizamKhanAmazai/GazeWatch", liveDemoUrl: "https://gaze-watch-frontend.vercel.app" },
        { /* ... project 1 data ... */ title: "E-Commerce Admin Dashboard", techStack: ["React", "JavaScript", "Tailwind CSS", "Recharts"], image: GazeWatch_backend, githubUrl: "https://github.com/NizamKhanAmazai/GazeWatch", liveDemoUrl: "https://gaze-watch.vercel.app" },
        { /* ... project 2 data ... */ title: "Blogging Website", techStack: ["React", "Firebase", "Redux", "Framer Motion"], image: "https://placehold.co/600x400/1e293b/4dd0e1?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" },
        { /* ... project 2 data ... */ title: "Task Manager App", techStack: ["Next.js", "Firebase", "Zustand", "Sass"], image: "https://placehold.co/600x400/1e293b/4dd0e1?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" },
        { /* ... project 3 data ... */ title: "Portfolio Website v3", techStack: ["React", "Tailwind CSS", "Vite", "JS (ES6+)"], image: "https://placehold.co/600x400/1a109b/f0ad4e?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" }, 
        { /* ... project 4 data ... */ title: "Internal Tooling Platform", techStack: ["Node.js", "Express", "MongoDB", "Docker"], image: "https://placehold.co/600x400/1e123b/f0aede?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" },
        { /* ... project 5 data ... */ title: "Real-Time Chat Application", techStack: ["React Native", "Socket.io", "Redux", "Node.js"], image: "https://placehold.co/600x400/1e593b/4dd0e9?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" },
        { /* ... project 6 data ... */ title: "Recipe Finder API", techStack: ["GraphQL", "Apollo Server", "PostgreSQL", "Prisma"], image: "https://placehold.co/600x400/1e100b/f09dde?text=Comming+Soon", githubUrl: "#", liveDemoUrl: "#" },
    ];

    // Create an array of refs for all project cards
    const projectRefs = useRef(projects.map(() => React.createRef()));

    return (
        <section 
            id="projects"
            className="py-10 sm:py-15 bg-gray-900 text-white p-4"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 py-2 pb-15">
                    My Latest Work
                </h2>
                
                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            index={index} // Pass the index here
                            ref={projectRefs.current[index]} // Pass unique ref
                        />
                    ))}
                </div>

                {/* More Projects CTA (Optional but good practice) */}
                <div className="text-center mt-12">
                    <a 
                        href="#contact"
                        className="inline-flex items-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600 transition duration-300 ease-in-out"
                    >
                        <Code className="w-5 h-5 mr-2" />
                        View More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

// / --- Minimal App Component to wrap and render the ProjectsSection ---
const Projects = () => {
  return ( 
    <ProjectsSection /> 
  );
};
export default Projects 
