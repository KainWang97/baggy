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
 * Large arrow in the bottom right
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 text-stone-800 hover:text-stone-500 transition-colors focus:outline-none mix-blend-darken"
          aria-label="Back to top"
        >
          <ArrowUp size={64} strokeWidth={1} />
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
  const isEven = index % 2 === 0;
  
  // Animation for text revealing
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  return (
    // Outer Container
    // IMPORTANT: Removed 'overflow-hidden' from here so the 'absolute' drawer can be seen outside this box.
    // Added 'flex-col md:flex-row' for split layout.
    <div 
      id={id}
      className={`relative w-full min-h-screen flex flex-col md:flex-row border-b border-stone-300/50 bg-[#f5f4f0] transition-all duration-300 ${isActive ? 'z-40' : 'z-0'}`}
    >
      
      {/* 
        IMAGE SIDE (50%)
        Full bleed, no padding. Touches the edges of the block.
      */}
      <div className={`relative w-full md:w-1/2 h-[50vh] md:h-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover block"
        />
      </div>

      {/* 
        TEXT / INFO SIDE (50%)
        Contains the blurred background and the text content.
        Needs 'overflow-hidden' to clip the blurred background, but NOT clip the drawer (which is outside this div).
      */}
      <div 
        className={`relative w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
      >
        {/* --- Immersive Blurred Background (Specific to Text Area) --- */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 w-full h-full scale-110">
             <img 
               src={project.imageUrl} 
               alt="" 
               className="w-full h-full object-cover blur-[60px] opacity-40 grayscale-[0.3]"
             />
          </div>
          {/* Tint Overlay */}
          <div 
            className="absolute inset-0 opacity-60 mix-blend-multiply"
            style={{ backgroundColor: project.color || '#e7e5e4' }}
          />
           {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* Text Content */}
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="mb-8">
             <span className="inline-block px-3 py-1 border border-stone-800/30 rounded-full text-[10px] md:text-xs font-medium tracking-widest text-stone-800 uppercase bg-white/30 backdrop-blur-sm mb-4">
              {project.category}
            </span>
            <span className="block text-xs font-serif italic text-stone-600">
              {project.year}
            </span>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-[0.9] -ml-1">
            {project.title}
          </h3>
          
          <p className="text-stone-800 font-light text-base md:text-lg leading-relaxed mb-10 mix-blend-hard-light">
            {project.shortDescription}
          </p>
          
          <button 
            onClick={onClick}
            className="flex items-center gap-3 text-stone-800 hover:text-stone-600 transition-colors group focus:outline-none"
          >
            <span className="text-xs tracking-[0.2em] uppercase border-b border-stone-800 pb-1 group-hover:border-stone-600">
              {isActive ? 'Close Details' : 'View Project'}
            </span>
            <span className={`transform transition-transform duration-500 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
               {isActive ? <X size={16} /> : <ArrowDown size={16} />}
            </span>
          </button>
        </motion.div>
      </div>

      {/* 
        The "Pull Down" Drawer Overlay 
        Positioned 'absolute' relative to the main ProjectItem container.
        Since ProjectItem does NOT have overflow-hidden, this can extend outside bounds.
      */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[100%] left-0 w-full bg-[#fbfaf8] border-b border-stone-200 shadow-2xl overflow-hidden z-50 origin-top"
          >
            <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
              {/* Paper texture for the drawer background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
               
              <div className="md:w-2/3 relative">
                <h4 className="text-xl font-serif mb-8 text-stone-800 border-b border-stone-200 pb-4 inline-block">
                  Project Insight
                </h4>
                <p className="text-stone-600 font-light leading-loose whitespace-pre-line text-lg">
                  {project.fullDescription}
                </p>
                
                <div className="mt-12 flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-600 text-xs tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col gap-8 bg-white p-8 border border-stone-100 h-fit relative shadow-sm">
                 <div>
                    <span className="block text-xs uppercase text-stone-400 mb-2 tracking-widest">Role</span>
                    <span className="text-stone-800 text-lg font-serif">Art Director, Designer</span>
                 </div>
                 <div>
                    <span className="block text-xs uppercase text-stone-400 mb-2 tracking-widest">Year</span>
                    <span className="text-stone-800 text-lg font-serif">{project.year}</span>
                 </div>
                 <button className="flex items-center gap-2 text-stone-900 hover:text-stone-500 transition-colors group/link mt-4">
                   <span className="text-sm font-medium border-b border-stone-900 group-hover/link:border-stone-500 pb-1">View Case Study</span>
                   <ExternalLink size={16} />
                 </button>
              </div>
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
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#f5f4f0]/80 backdrop-blur-md transition-all duration-300 border-b border-transparent hover:border-stone-200">
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
                    className="absolute top-full right-0 mt-6 w-64 bg-[#f0efe9]/80 backdrop-blur-md border border-stone-200 shadow-xl p-2 rounded-sm z-50"
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

      {/* Click outside listener */}
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