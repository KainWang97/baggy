import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowDown, X, ExternalLink, ChevronDown, ArrowUp } from 'lucide-react';
import { PROJECTS, SOCIAL_LINKS } from './constants';
import { Project } from './types';

// --- Components ---

/**
 * Header / Hero Section
 */
const Hero: React.FC = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 relative overflow-hidden bg-[#f5f4f0]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl z-10"
      >
        <h2 className="text-sm md:text-base tracking-[0.2em] text-stone-500 mb-6 uppercase">
          Graphic Design / Brand Identity
        </h2>
        <h1 className="text-5xl md:text-8xl font-light text-stone-800 mb-8 leading-tight tracking-tight">
          Saito <br className="md:hidden" /> Kenji
        </h1>
        <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed mb-12">
          Visual storytelling through typography and space. <br />
          Creating timeless identities and functional signage systems.
        </p>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-400"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ArrowDown size={24} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/**
 * Back To Top Button
 * Transparent minimalist arrow with hover effects
 */
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.2, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={scrollToTop}
          // Removed bg-white, shadow, rounded-full. Added p-6 for large click area.
          className="fixed bottom-6 right-6 z-50 p-6 text-stone-800/60 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={36} strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/**
 * Individual Project Item
 */
interface ProjectItemProps {
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
  id?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, isActive, onClick, id }) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // Animation for text revealing
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
    }
  };

  // Auto-scroll logic when details expand
  useEffect(() => {
    if (isActive && detailsRef.current) {
      // Immediate scroll with minimal delay to ensure ref is mounted
      const timer = setTimeout(() => {
        if (detailsRef.current) {
          // Calculate position: absolute top of the drawer + window scroll - header offset
          const y = detailsRef.current.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 10); 
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    // Outer Container
    // Full screen height, relative positioning.
    // Removed overflow-hidden so the drawer can appear below.
    <div 
      id={id}
      onClick={onClick}
      className={`relative w-full h-screen bg-stone-900 cursor-pointer group ${isActive ? 'z-40' : 'z-0'}`}
    >
      
      {/* 
        Background Image Container
        This container clips the image zoom effect so it doesn't spill out.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* 
        Floating Text Content 
        Positioned at the bottom, layered over the image.
      */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-20 md:pb-24 z-20 flex flex-col justify-end items-center md:items-start text-center md:text-left pointer-events-none">
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl w-full"
        >
          {/* Category Label */}
          <p className="text-white/80 font-medium tracking-[0.2em] text-xs md:text-sm uppercase mb-4 md:mb-6 shadow-black drop-shadow-sm">
            {project.category}
          </p>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-6 md:mb-8 drop-shadow-md">
            {project.title}
          </h3>
          
          {/* Short Description - Resized to min 14px (text-sm) max 18px (text-lg) */}
          <p className="text-s md:text-lg text-stone-200 font-normal leading-relaxed max-w-xl mb-8 md:mb-10 drop-shadow-sm opacity-95">
            {project.shortDescription}
          </p>
          
          {/* Call to Action Button */}
          {/* pointer-events-auto allows the hover state on the button itself, though clicking anywhere works */}
          <div className="pointer-events-auto inline-flex items-center gap-3 px-8 py-4 bg-gray text-stone-900  font-semibold text-sm md:text-base rounded-full tracking-wide hover:bg-stone-100 transition-colors shadow-lg">
             <span>{isActive ? 'Close' : 'View Project'}</span>
             <ChevronDown size={18} className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
          </div>
        </motion.div>
      </div>

      {/* 
        The "Pull Down" Drawer Overlay 
      */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            ref={detailsRef}
            // Stop propagation here so clicking inside the details doesn't trigger the parent onClick (which would close it)
            onClick={(e) => e.stopPropagation()} 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-[#fbfaf8] border-t border-stone-200 shadow-2xl overflow-hidden z-50 origin-top cursor-auto"
          >
            <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
              
              <div className="md:w-2/3 relative">
                <h4 className="text-2xl font-serif mb-8 text-stone-800">
                  Project Insight
                </h4>
                <p className="text-stone-600 font-light leading-loose whitespace-pre-line text-lg md:text-xl">
                  {project.fullDescription}
                </p>
                
                <div className="mt-12 flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-600 text-sm tracking-wide rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col gap-8 h-fit relative">
                 <div className="p-8 bg-white border border-stone-100 rounded-xl shadow-sm">
                    <div className="mb-6">
                        <span className="block text-xs uppercase text-stone-400 mb-2 tracking-widest font-semibold">Role</span>
                        <span className="text-stone-800 text-lg">Art Director, Designer</span>
                    </div>
                    <div className="mb-6">
                        <span className="block text-xs uppercase text-stone-400 mb-2 tracking-widest font-semibold">Year</span>
                        <span className="text-stone-800 text-lg">{project.year}</span>
                    </div>
                    <button className="flex items-center gap-2 text-stone-900 hover:text-stone-500 transition-colors group/link mt-2">
                      <span className="text-sm font-semibold border-b border-stone-900 group-hover/link:border-stone-500 pb-0.5">View Case Study</span>
                      <ExternalLink size={16} />
                    </button>
                 </div>
              </div>

              {/* Distinct Close Button in Bottom Right */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent bubbling
                  onClick(); // Trigger close
                }}
                className="absolute bottom-8 right-8 bg-stone-900 text-white hover:bg-stone-500 transition-colors px-6 py-3 flex items-center gap-3 shadow-l z-50 group opacity-50

"
              >
                <span className="text-xs font-bold tracking-widest uppercase">Close</span>
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Footer Component
 */
const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-24 px-6 bg-[#eae8e0] border-t border-stone-300 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-12 md:mb-0">
           <h2 className="text-4xl font-serif text-stone-800 mb-6">Let's Connect</h2>
           <p className="text-stone-600 font-light max-w-sm text-lg">
             Available for freelance opportunities and coffee chats. 
             Based in Tokyo, working globally.
           </p>
        </div>

        <div className="flex flex-col gap-6">
           {SOCIAL_LINKS.map(link => (
             <a 
              key={link.name} 
              href={link.url}
              className="flex items-center gap-4 text-stone-500 hover:text-stone-800 transition-colors group"
             >
               <span className="h-[1px] w-8 bg-stone-400 group-hover:bg-stone-800 transition-colors"></span>
               <span className="uppercase tracking-widest text-sm">{link.name}</span>
             </a>
           ))}
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mt-24 pt-8 border-t border-stone-400/30 flex justify-between items-center text-stone-500 text-xs tracking-wider">
        <span>© {new Date().getFullYear()} Saito Kenji. All Rights Reserved.</span>
        <span>ZenFolio</span>
      </div>
    </footer>
  );
};

/**
 * Main App Component
 */
const App: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isWorksMenuOpen, setIsWorksMenuOpen] = useState(false);

  const handleProjectClick = (id: string) => {
    setActiveProjectId(prev => prev === id ? null : id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsWorksMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsWorksMenuOpen(false);
  };

  const scrollToProject = (projectId: string) => {
    const element = document.getElementById(`project-${projectId}`);
    if (element) {
      // Offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsWorksMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-stone-300 selection:text-stone-900 bg-[#f5f4f0] overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#f5f4f0]/90 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">
         <div className="cursor-pointer group" onClick={scrollToTop}>
            <span className="font-serif font-bold text-xl tracking-tighter text-stone-800 group-hover:text-stone-500 transition-colors">SK.</span>
         </div>
         <div className="flex items-center gap-8 relative">
            
            {/* Works Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => setIsWorksMenuOpen(!isWorksMenuOpen)} 
                className="flex items-center gap-1 text-stone-800 text-xs font-bold uppercase tracking-widest hover:text-stone-500 transition-colors focus:outline-none"
              >
                Works
                <ChevronDown size={14} className={`transform transition-transform duration-300 ${isWorksMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Works Dropdown Menu */}
              <AnimatePresence>
                {isWorksMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-6 w-64 bg-[#f0efe9]/95 backdrop-blur-md border border-stone-200 shadow-xl p-2 rounded-sm z-50"
                  >
                    <ul className="flex flex-col">
                      {PROJECTS.map((project) => (
                        <li key={project.id}>
                          <button
                            onClick={() => scrollToProject(project.id)}
                            className="w-full text-left px-4 py-3 text-xs text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 transition-colors font-medium truncate focus:outline-none flex justify-between group/item"
                          >
                            <span>{project.title}</span>
                            <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-stone-800 text-xs font-bold uppercase tracking-widest hover:text-stone-500 transition-colors focus:outline-none"
            >
              Contact
            </button>
         </div>
      </nav>

      {/* Click outside listener for menu */}
      {isWorksMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setIsWorksMenuOpen(false)} 
        />
      )}

      <main className="w-full pt-0">
        <Hero />
        
        <section id="works" className="w-full border-t border-stone-300">
           <div className="flex flex-col w-full">
             {PROJECTS.map((project, index) => (
               <ProjectItem 
                 key={project.id}
                 id={`project-${project.id}`}
                 index={index}
                 project={project}
                 isActive={activeProjectId === project.id}
                 onClick={() => handleProjectClick(project.id)}
               />
             ))}
           </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;