import React, { useRef, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, ChevronDown, User, Code, Server, Wrench, Cpu, Database, Settings, Beaker, Shield, Users, FlaskConical } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ... (Typewriter Hook/Logic remains the same)
// --- Component: Progress Bar (Helper for Skills Section) ---
const ProgressBar = React.forwardRef(({ name, percentage }, ref) => {
    // Determine color based on percentage
    let barColor = 'bg-cyan-500';
    if (percentage > 85) {
        barColor = 'bg-green-500';
    } else if (percentage > 65) {
        barColor = 'bg-indigo-500';
    }

    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-white">{name}</span>
                <span className="text-sm font-medium text-gray-300">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    ref={ref} // Ref added here to target the inner bar
                    className={`h-2.5 rounded-full ${barColor}`} 
                    // Initial width is set to 0, GSAP will animate it later
                    style={{ width: `0%` }} 
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    role="progressbar"
                ></div>
            </div>
        </div>
    );
});

// Function to generate the card component using forwardRef
const SkillCategory = React.forwardRef(({ title, skills, icon: Icon }, ref) => {
    const barRefs = useRef([]); // To hold refs for all progress bars

    useEffect(() => {
        if (!ref.current) return;
        
        // Timeline for the individual skill box entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                // Rule 2: Animation triggers when top of the box hits 40% down the viewport (60% visible)
                start: "top 90%", 
                toggleActions: "play none none none",
            },
            defaults: { duration: 0.8, ease: Power3.easeOut }
        });

        // Rule 3: High quality animation - 3D rotate and slide up
        tl.fromTo(ref.current, {
            opacity: 0, 
            y: 50, 
            rotationY: 15, // Subtle 3D rotation start
            scale: 0.95 
        }, {
            opacity: 1, 
            y: 0, 
            rotationY: 0,
            scale: 1,
            duration: 1.0,
            ease: "back.out(1.4)" // Snappy entrance
        });

        // Animate the progress bars to their percentage value
        // Use a stagger for a clean, sequential reveal
        tl.to(barRefs.current, {
            width: (i, target) => {
                // Get the target percentage from the aria-valuenow attribute
                return `${target.getAttribute('aria-valuenow')}%`;
            },
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut"
        }, "-=0.5"); // Start progress bars while the box is still settling

    }, [ref]); // Rerun effect if ref changes (though it shouldn't)

    return (
        <div 
            ref={ref} // Pass ref to the main div
            className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition duration-300 hover:border-indigo-500/50"
        >
            <div className="flex items-center mb-6">
                <Icon className="w-7 h-7 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
            <div>
                {skills.map((skill, index) => (
                    // Pass the ref function to collect the progress bar div
                    <ProgressBar 
                        ref={(el) => (barRefs.current[index] = el)}
                        key={skill.name} 
                        name={skill.name} 
                        percentage={skill.percentage} 
                    />
                ))}
            </div>
        </div>
    );
});

// --- Skills Section Component ---
const SkillsSection = () => { 
    // ... (Your skill data arrays remain the same) ...
    const coreSkills = [
        { name: "Data Structures & Algorithms", percentage: 80 },
        { name: "Object-Oriented Programming (OOP)", percentage: 80 },
        { name: "REST API Architecture", percentage: 85 },
        { name: "Git & Version Control", percentage: 90 },
        { name: "HTTP/HTTPS, Cookies & Sessions", percentage: 90 },
        { name: "CLI / Terminal Basics", percentage: 75 },
    ];

    const frontendSkills = [
        { name: "HTML5", percentage: 90 },
        { name: "CSS3", percentage: 85 },
        { name: "JavaScript (ES6+)", percentage: 90 },
        { name: "React.js / Vue.js / Angular", percentage: 90 },
        { name: "Responsive Design", percentage: 90 },
        { name: "Tailwind / Bootstrap", percentage: 80 },
        { name: "State Management (Redux/Vuex)", percentage: 90 },
    ];

    const backendSkills = [
        { name: "Node.js / Express / NestJS", percentage: 90 },
        { name: "Python (Django / FastAPI)", percentage: 50 },
        { name: "Java (Spring Boot)", percentage: 45 },
        { name: "RESTful API Development", percentage: 90 },
        { name: "Authentication & Authorization (JWT / OAuth)", percentage: 90 },
        { name: "Microservices Architecture", percentage: 60 },
    ];

    const databaseSkills = [
        { name: "SQL Databases (MySQL / PostgreSQL)", percentage: 50 },
        { name: "NoSQL Databases (MongoDB / Redis)", percentage: 90 },
        { name: "Database Design & Normalization", percentage: 75 },
        { name: "Query Optimization & Indexing", percentage: 90 },
        { name: "ORMs (Prisma, TypeORM, Sequelize)", percentage: 80 },
    ];

    const devOpsSkills = [
        { name: "Linux Basics", percentage: 75 },
        { name: "Docker", percentage: 55 },
        { name: "CI/CD (GitHub Actions, GitLab CI)", percentage: 70 },
        { name: "Cloud (AWS / GCP / Azure)", percentage: 50 },
        { name: "Nginx / Apache", percentage: 60 },
        { name: "Deployment (Vercel, Netlify, Render)", percentage: 95 },
    ];  

    const testingSkills = [
        { name: "Unit Testing (Jest, Mocha)", percentage: 65 },
        { name: "Integration Testing", percentage: 65 },
        { name: "End-to-End Testing (Cypress/Playwright)", percentage: 60 },
        { name: "API Testing (Postman)", percentage: 95 },
    ];


    const securitySkills = [
        { name: "OWASP Top 10", percentage: 50 },
        { name: "XSS Prevention", percentage: 75 },
        { name: "SQL Injection Prevention", percentage: 55 },
        { name: "CORS & CSRF Protection", percentage: 80 },
        { name: "HTTPS & SSL Basics", percentage: 75 },
    ];

    const softSkills = [
        { name: "Problem Solving", percentage: 90 },
        { name: "Debugging & Troubleshooting", percentage: 85 },
        { name: "Communication", percentage: 95 },
        { name: "Team Collaboration (Agile/Scrum)", percentage: 80 },
        { name: "Time Management", percentage: 90 },
    ];

    
    const advancedSkills = [
    { name: "GraphQL (Apollo)", percentage: 55 },
        { name: "WebSockets", percentage: 70 },
        { name: "Serverless (AWS Lambda, Firebase)", percentage: 55 },
        { name: "Message Brokers (Kafka, RabbitMQ)", percentage: 55 },
        { name: "Mobile (React Native / Flutter)", percentage: 0 },
    ];
    // Note: Removed the local SkillCategory definition since we are using the enhanced one above
    
    // Create an array of refs for the nine skill boxes
    const skillRefs = useRef(Array(9).fill(0).map(() => React.createRef()));

    const skillData = [
        { title: "Core Skills", skills: coreSkills, icon: Cpu },
        { title: "Frontend Development", skills: frontendSkills, icon: Code },
        { title: "Backend ", skills: backendSkills, icon: Server },
        { title: "Database Skills", skills: databaseSkills, icon: Database },
        { title: "DevOps & Deployment Skills", skills: devOpsSkills, icon: Settings },
        { title: "Testing Skills", skills: testingSkills, icon: Beaker },
        { title: "Security Skills", skills: securitySkills, icon: Shield },
        { title: "Soft Skills", skills: softSkills, icon: Users },
        { title: "Advanced Skills", skills: advancedSkills, icon: FlaskConical },
    ];

    return (
        <section 
            id="skills"
            className="py-20 sm:py-15 bg-gray-900 text-white p-4"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 py-2">
                    My Skills & Expertise
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillData.map((item, index) => (
                        <SkillCategory 
                            key={item.title} 
                            ref={skillRefs.current[index]} // Pass unique ref
                            title={item.title}
                            skills={item.skills}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// // --- Minimal App Component to wrap and render the sections ---
const Skills = () => {
  return ( 
    <SkillsSection /> 
  );
};

export default Skills;
