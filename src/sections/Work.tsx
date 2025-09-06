// src/components/Work.tsx

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from "react";

import { courses } from "../constants";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import { useHaptic } from "../hooks/useHaptic";
import { useAnnouncement } from "../components/AnnouncementSystem";
import { MagneticCard } from "../components/MagneticCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useSwipeable } from "react-swipeable";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";


const Work: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width:1060px)");
  const { triggerHaptic } = useHaptic();
  const { announce } = useAnnouncement();
  const { ref: workRef, inView } = useScrollAnimation(0.1, true);

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


  return (
    <section
      id="work"
      className="py-20 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <div {...swipeHandlers} className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={workRef}
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-gpu">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Projects</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore my portfolio of web applications built with modern technologies
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
                <button
                  onClick={prevSlide}
                  className="btn btn-outline btn-sm">
                  Previous
                </button>
                <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  {currentSlide + 1} of {courses.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="btn btn-outline btn-sm">
                  Next
                </button>
              </div>
            )}

            {/* Project Showcase */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
              
              {/* Project Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
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
              <div className="p-6">
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
                      
                      <a
                        href={courses[currentSlide]?.projects?.[currentProjectIndex]?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm">
                        View Project
                      </a>
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
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Work;
