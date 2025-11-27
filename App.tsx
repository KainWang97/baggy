import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, X, Globe, ExternalLink, Mail } from 'lucide-react';
import { PROJECTS, SOCIAL_LINKS } from './constants';
import { Project } from './types';

// --- Components ---

/**
 * Header / Hero Section
 * Simple, vertically centered introduction.
 */
const Hero: React.FC = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl z-10"
      >
        <h2 className="text-sm md:text-base tracking-[0.2em] text-stone-500 mb-6 uppercase">
          Portfolio
        </h2>
        <h1 className="text-5xl md:text-7xl font-light text-stone-800 mb-8 leading-tight">
          Saito <br className="md:hidden" /> Kenji
        </h1>
        <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed mb-12">
          Design is the art of subtraction. <br />
          Crafting digital clarity in a noisy world.
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
          <ArrowDown size={20} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/**
 * Individual Project Item
 * Handles the "Door Slide" entry and "Pull Down" expansion animations.
 */
interface ProjectItemProps {
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, isActive, onClick }) => {
  const isEven = index % 2 === 0;
  
  // Animation Variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -60 : 60 // Slide from left if even, right if odd
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1], // Cubic bezier for "heavy door" feel
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }} // Trigger when 10% in view
      className="w-full max-w-5xl mx-auto mb-12 md:mb-24 px-4 md:px-8"
    >
      <div 
        onClick={onClick}
        className="group cursor-pointer relative"
      >
        {/* Main "Closed" Card Area */}
        <div className="relative overflow-hidden bg-white/50 border border-stone-200 hover:border-stone-400 transition-colors duration-500 ease-out">
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Image Section - Slides slightly on hover (parallax-ish) */}
            <div className="w-full md:w-3/5 overflow-hidden h-64 md:h-96 relative bg-stone-200">
               <motion.img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover filter grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Text Preview Section */}
            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium tracking-widest text-stone-500 uppercase block mb-2">
                  {project.category} — {project.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4 group-hover:text-stone-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between text-stone-400">
                <span className="text-xs tracking-wider uppercase group-hover:text-stone-800 transition-colors">
                  {isActive ? 'Close' : 'Read Details'}
                </span>
                <span className={`transform transition-transform duration-500 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                   {isActive ? <X size={16} /> : <ArrowDown size={16} />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The "Pull Down" Drawer Animation */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-[#fbfaf8] border-l border-r border-b border-stone-200"
            >
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="md:w-2/3">
                  <h4 className="text-lg font-serif mb-6 text-stone-800">About the Project</h4>
                  <p className="text-stone-600 font-light leading-relaxed whitespace-pre-line text-base md:text-lg">
                    {project.fullDescription}
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-stone-200/50 text-stone-600 text-xs tracking-wide rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-stone-200 pt-8 md:pt-0 md:pl-8 flex flex-col justify-start">
                   <div className="mb-6">
                      <span className="block text-xs uppercase text-stone-400 mb-1">Role</span>
                      <span className="text-stone-700">Lead Designer, Developer</span>
                   </div>
                   <div className="mb-6">
                      <span className="block text-xs uppercase text-stone-400 mb-1">Year</span>
                      <span className="text-stone-700">{project.year}</span>
                   </div>
                   <button className="flex items-center gap-2 text-stone-800 hover:text-stone-500 transition-colors group/link w-fit">
                     <span className="text-sm font-medium border-b border-stone-800 group-hover/link:border-stone-500">Visit Site</span>
                     <ExternalLink size={14} />
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/**
 * Footer Component
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 bg-[#f0efe9] mt-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-12 md:mb-0">
           <h2 className="text-3xl font-serif text-stone-800 mb-4">Let's Connect</h2>
           <p className="text-stone-600 font-light max-w-sm">
             Available for freelance opportunities and coffee chats. 
             Based in Tokyo, working globally.
           </p>
        </div>

        <div className="flex flex-col gap-4">
           {SOCIAL_LINKS.map(link => (
             <a 
              key={link.name} 
              href={link.url}
              className="flex items-center gap-3 text-stone-500 hover:text-stone-800 transition-colors group"
             >
               <span className="h-[1px] w-4 bg-stone-300 group-hover:bg-stone-800 transition-colors"></span>
               <span className="uppercase tracking-widest text-xs">{link.name}</span>
             </a>
           ))}
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mt-24 pt-8 border-t border-stone-300 flex justify-between items-center text-stone-400 text-xs">
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

  const handleProjectClick = (id: string) => {
    // If clicking the already open project, close it. Otherwise open the new one.
    setActiveProjectId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen selection:bg-stone-300 selection:text-stone-900">
      
      {/* Navigation (Simple Logo) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
         <div className="pointer-events-auto">
            <span className="font-serif font-bold text-xl tracking-tighter text-stone-800">SK.</span>
         </div>
         <div className="pointer-events-auto">
            <a href="mailto:hello@example.com" className="p-3 bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 transition-colors shadow-none">
              <Mail size={16} />
            </a>
         </div>
      </nav>

      <main className="w-full">
        <Hero />
        
        <section className="py-12 md:py-24">
           <div className="text-center mb-24">
             <span className="text-xs font-bold text-stone-400 uppercase tracking-[0.3em]">Selected Works</span>
           </div>

           <div className="flex flex-col w-full">
             {PROJECTS.map((project, index) => (
               <ProjectItem 
                 key={project.id}
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
    </div>
  );
};

export default App;
