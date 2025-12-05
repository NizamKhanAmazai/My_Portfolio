import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for clean UI

// The main Navbar component for the portfolio
const Navbar = ( ) => {

  const links = [
    { id: 'home', name: 'Home', href: '#home' },
    { id: 'about', name: 'About', href: '#about' },
    { id: 'skills', name: 'Skills', href: '#skills' },
    { id: 'projects', name: 'Projects', href: '#projects' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = links.map((link) => {
    return(
    <li key={link.id}>
      <a
        href={link.href}
        // Tailwind classes for link styling, active and hover states
        className="block py-2 px-3 lg:px-4 text-white hover:text-indigo-300 transition duration-150 ease-in-out font-medium rounded-lg lg:rounded-none"
        // Close the menu on mobile after clicking a link
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </a>
    </li>
    )
});

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-xl z-50 overflow-x-hidden ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Portfolio Title */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-wider">
              Nizam.Dev
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex space-x-6"> 
              {navItems}
            </ul>
          </div>

          {/* Mobile Menu Button (Hamburger/Close Icon) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Toggle Icon based on menu state */}
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        // Conditional Tailwind classes for responsive hiding/showing
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-gray-800 border-t border-gray-700`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
          <ul className="flex flex-col overflow-y-auto">
            {navItems}
          </ul>
        </div>
      </div>
    </header>
  );
};

 
export default Navbar;















      // {/* Example Content Sections to make links clickable */}
      // <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      //   {portfolioLinks.map((link) => (
      //     <section key={link.id} id={link.id} className="min-h-[70vh] flex items-center justify-center border-b border-gray-700 last:border-b-0">
      //       <div className="text-center p-8 bg-gray-800/50 rounded-xl shadow-2xl">
      //         <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-300 mb-4">{link.name} Section</h1>
      //         <p className="text-lg text-gray-400">Content for your {link.name} here.</p>
      //       </div>
      //     </section>
      //   ))}
      // </main>
      
      // <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-700">
      //   &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
      // </footer>
 