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
    <section
      className="py-20 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <div {...swipeHandlers} className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={workRef}
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-gpu">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Projects</span>
            </h2>
            
            {/* 3D Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewModeToggle}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
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
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore my portfolio of web applications built with modern technologies
            {viewMode === '3d' && (
              <span className="block mt-2 text-sm text-primary-500">
                🎮 Interactive 3D Experience • Click & drag to explore
              </span>
            )}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Technology Filter */}
          {isDesktop && (
            <motion.aside
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
                  Technologies
                </h3>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <button
                      key={course.courseName}
                      onClick={() => changeSlide(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 shadow-md"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}>
                      <img
                        src={course.language?.[0]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23e5e7eb'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-size='12' fill='%236b7280'%3E?%3C/text%3E%3C/svg%3E"}
                        alt={course.language?.[0]?.alt || "Language icon"}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{course.courseName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Navigation */}
            {!isDesktop && (
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                >
                  Previous
                </Button>
                <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  {currentSlide + 1} of {courses.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
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
                  // 2D Project Display (Original)
                  <Card 
                    variant="glass" 
                    size="lg" 
                    containerQuery={true}
                    tilt={!shouldReduceMotion}
                    shimmer={!shouldReduceMotion}
                    glow={true}
                    className="overflow-hidden backdrop-blur-xl"
                  >
                    {/* Project Header */}
                    <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={courses[currentSlide]?.language?.[0]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3Ctext x='24' y='30' text-anchor='middle' font-size='16' fill='%236b7280'%3E?%3C/text%3E%3C/svg%3E"}
                          alt={courses[currentSlide]?.language?.[0]?.alt || "Technology"}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                            {courses[currentSlide]?.courseName || "Unknown Technology"}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {courses[currentSlide]?.summary || "No description available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Project Carousel */}
                    <div className="relative">
                      {/* Navigation Arrows */}
                      <button
                        onClick={handleProjectPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white dark:bg-neutral-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Previous Project">
                        <FaChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                      </button>
                      
                      <button
                        onClick={handleProjectNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white dark:bg-neutral-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Next Project">
                        <FaChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                      </button>

                      {/* Project Card */}
                      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6">
                        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                            <img
                              src={courses[currentSlide]?.projects?.[currentProjectIndex]?.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-size='24' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E"}
                              alt={courses[currentSlide]?.projects?.[currentProjectIndex]?.title || "Project Image"}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        <div className="text-center">
                          <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
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
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                          >
                            View Project
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Project Counter */}
                    <div className="flex justify-center mt-6">
                      <div className="flex gap-2">
                        {courses[currentSlide]?.projects?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentProjectIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentProjectIndex
                                ? "bg-primary-500"
                                : "bg-neutral-300 dark:bg-neutral-600"
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
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
