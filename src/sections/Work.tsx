// src/components/Work.tsx

import { FaChevronLeft, FaChevronRight, FaTh, FaEye } from "react-icons/fa";
import React, { useState, useEffect } from "react";

import { courses } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import { useHaptic } from "../hooks/useHaptic";
import { useAnnouncement } from "../components/AnnouncementSystem";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useSwipeable } from "react-swipeable";
import { CustomButton as Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
// import { useTheme } from "../contexts/ThemeContext";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { useAccessibility } from "../hooks/useAccessibility";
import { SkeletonProjectCardAdvanced } from "../components/SkeletonLoader";
import Simple3DPreview from "../components/3d/Simple3DPreview";


const Work: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  // const [selectedProject, setSelectedProject] = useState<any>(null);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:1060px)");
  const { triggerHaptic } = useHaptic();
  const { announce } = useAnnouncement();
  const { ref: workRef, inView } = useScrollAnimation(0.1, true);
  // const { currentTheme } = useTheme();
  const { shouldReduceMotion } = useAccessibility();
  
  // Performance monitoring
  usePerformanceMonitor('Work', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true
  });

  // Swipe gestures for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  });

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
    triggerHaptic('light');
    const newIndex = currentSlide === 0 ? courses.length - 1 : currentSlide - 1;
    announce(`Now viewing ${courses[newIndex]?.courseName || 'Previous technology'} projects`);
  };
  
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
    triggerHaptic('light');
    const newIndex = currentSlide === courses.length - 1 ? 0 : currentSlide + 1;
    announce(`Now viewing ${courses[newIndex]?.courseName || 'Next technology'} projects`);
  };

  const changeSlide = (index: number): void => {
    setCurrentSlide(index);
    setCurrentProjectIndex(0);
    triggerHaptic('light');
    announce(`Now viewing ${courses[index]?.courseName || 'Unknown Technology'} projects`);
  };

  const handleProjectPrev = (): void => {
    const currentCourse = courses[currentSlide];
    if (!currentCourse || !currentCourse.projects || currentCourse.projects.length === 0) return;
    
    const projects = currentCourse.projects;
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const handleProjectNext = (): void => {
    const currentCourse = courses[currentSlide];
    if (!currentCourse || !currentCourse.projects || currentCourse.projects.length === 0) return;
    
    const projects = currentCourse.projects;
    setCurrentProjectIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  // 3D Interaction Handlers
  const handleViewModeToggle = (): void => {
    setViewMode(prev => {
      const newMode = prev === '2d' ? '3d' : '2d';
      return newMode;
    });
    triggerHaptic('light');
    announce(`Switched to ${viewMode === '2d' ? '3D' : '2D'} view mode`);
  };

  // 3D view effect
  useEffect(() => {
    if (viewMode === '3d') {
      // 3D view is active
    }
  }, [viewMode, currentSlide, currentProjectIndex]);

  const handleProjectClick = (project: any): void => {
    if (project && project.link && project.link !== '#') {
      triggerHaptic('medium');
      announce(`Opening ${project.name || project.title} project`);
      window.open(project.link, '_blank');
    } else {
      triggerHaptic('light');
      announce('No project link available');
    }
  };

  // const handleModalClose = (): void => {
  //   setIsModalOpen(false);
  //   setSelectedProject(null);
  //   triggerHaptic('light');
  // };

  // const handle3DProjectChange = (index: number): void => {
  //   setCurrentProjectIndex(index);
  //   triggerHaptic('light');
  // };


  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 90, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>

      <div {...swipeHandlers} className="container mx-auto px-6 relative z-10">
        {/* Modern Asymmetrical Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            ref={workRef}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Portfolio</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore my portfolio of web applications built with modern technologies. 
              Each project showcases different aspects of full-stack development.
            </p>

            {/* Modern View Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewModeToggle}
                className="flex items-center gap-2 hover:scale-105 transition-transform border-2 border-white/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white text-white"
                aria-label={`Switch to ${viewMode === '2d' ? '3D' : '2D'} view`}
              >
                {viewMode === '2d' ? (
                  <>
                    <FaTh className="w-4 h-4" />
                    <span className="hidden sm:inline">3D View</span>
                  </>
                ) : (
                  <>
                    <FaEye className="w-4 h-4" />
                    <span className="hidden sm:inline">2D View</span>
                  </>
                )}
              </Button>
              
              {viewMode === '3d' && (
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                  <span className="text-yellow-400 text-sm font-medium">
                    🎮 Interactive 3D Experience
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-3xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-6xl">💻</div>
            </div>
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              animate={{
                y: [0, 10, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Modern Project Showcase */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Modern Sidebar - Technology Filter */}
          {isDesktop && (
            <motion.aside
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              <div className="sticky top-24">
                <h3 className="text-2xl font-bold mb-8 text-white">
                  Technologies
                </h3>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <motion.button
                      key={course.courseName}
                      onClick={() => changeSlide(index)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white/10 backdrop-blur-sm border border-cyan-400/50 text-white shadow-lg"
                          : "hover:bg-white/5 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-white"
                      }`}>
                      <img
                        src={course.language?.[0]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23e5e7eb'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-size='12' fill='%236b7280'%3E?%3C/text%3E%3C/svg%3E"}
                        alt={course.language?.[0]?.alt || "Language icon"}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold">{course.courseName}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Modern Mobile Navigation */}
            {!isDesktop && (
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="border-2 border-white/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white text-white"
                >
                  Previous
                </Button>
                <span className="flex items-center text-sm text-gray-300">
                  {currentSlide + 1} of {courses.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="border-2 border-white/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white text-white"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Enhanced Project Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide}-${viewMode}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {isLoading ? (
                  <SkeletonProjectCardAdvanced />
                ) : viewMode === '3d' ? (
                  // 3D Project Showcase
                  <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
                    <Simple3DPreview
                      project={courses[currentSlide]?.projects?.[currentProjectIndex] || {
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-size='24' fill='%236b7280'%3ENo Project%3C/text%3E%3C/svg%3E",
                        title: "No Project Available",
                        name: "no-project",
                        link: "#"
                      }}
                      onProjectClick={() => handleProjectClick(courses[currentSlide]?.projects?.[currentProjectIndex])}
                    />
                  </div>
                ) : (
                  // Modern 2D Project Display
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Modern Project Header */}
                    <div className="border-b border-white/20 mb-8">
                      <div className="flex items-center gap-6 mb-6">
                        <img
                          src={courses[currentSlide]?.language?.[0]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3Ctext x='24' y='30' text-anchor='middle' font-size='16' fill='%236b7280'%3E?%3C/text%3E%3C/svg%3E"}
                          alt={courses[currentSlide]?.language?.[0]?.alt || "Technology"}
                          className="w-16 h-16 rounded-full border-4 border-white/20"
                        />
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {courses[currentSlide]?.courseName || "Unknown Technology"}
                          </h3>
                          <p className="text-gray-300 text-lg">
                            {courses[currentSlide]?.summary || "No description available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Modern Project Carousel */}
                    <div className="relative">
                      {/* Modern Navigation Arrows */}
                      <button
                        onClick={handleProjectPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300"
                        aria-label="Previous Project">
                        <FaChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      
                      <button
                        onClick={handleProjectNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300"
                        aria-label="Next Project">
                        <FaChevronRight className="w-5 h-5 text-white" />
                      </button>

                      {/* Modern Project Card */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <div className="aspect-video mb-6 rounded-2xl overflow-hidden border border-white/20">
                            <img
                              src={courses[currentSlide]?.projects?.[currentProjectIndex]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-size='24' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E"}
                              alt={courses[currentSlide]?.projects?.[currentProjectIndex]?.title || "Project Image"}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        <div className="text-center">
                          <h4 className="text-2xl font-bold text-white mb-4">
                            {courses[currentSlide]?.projects?.[currentProjectIndex]?.title || "Project Title"}
                          </h4>
                          
                          <Button
                            variant="primary"
                            size="sm"
                            magnetic={!shouldReduceMotion}
                            ripple={true}
                            glow={true}
                            loading={isLoading}
                            onClick={() => {
                              setIsLoading(true);
                              setTimeout(() => {
                                window.open(courses[currentSlide]?.projects?.[currentProjectIndex]?.link || "#", '_blank');
                                setIsLoading(false);
                              }, 1000);
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-2xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            View Project
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Modern Project Counter */}
                    <div className="flex justify-center mt-8">
                      <div className="flex gap-3">
                        {courses[currentSlide]?.projects?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentProjectIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentProjectIndex
                                ? "bg-cyan-400 scale-125"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* 3D Project Modal - Temporarily disabled */}
      {false && (
        <div>3D Modal temporarily disabled</div>
      )}
    </section>
  );
};

export default Work;
