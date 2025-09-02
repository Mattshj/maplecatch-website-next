// components/ScreenshotCard.tsx

"use client"; // Add this directive at the top

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image"; // Import the Next.js Image component
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";

// Update image paths to be relative to the `public` folder
const screenshots = [
  {
    src: "/assets/screenshots/sc1.jpg",
    desc: "Make your list, Shop smarter",
  },
  {
    src: "/assets/screenshots/sc3.jpg",
    desc: "Choose from products or add your own",
  },
  {
    src: "/assets/screenshots/sc2.jpg",
    desc: "See local brands and organize your shopping",
  },
  {
    src: "/assets/screenshots/sc5.jpg",
    desc: "Customize your account and app settings",
  },
  {
    src: "/assets/screenshots/sc4.jpg",
    desc: "Report brand issues in a single tap",
  },
];

export default function ScreenshotCard() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    // Simulate loading for smooth initial render
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const goTo = (direction: "prev" | "next") => {
    setCurrent((prev) =>
      direction === "next"
        ? (prev + 1) % screenshots.length
        : (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goTo("next");
    }
    if (isRightSwipe) {
      goTo("prev");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo("prev");
    if (e.key === "ArrowRight") goTo("next");
    if (e.key === " ") {
      e.preventDefault();
      setPaused(!paused);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-primary-light/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary-light/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <section
        id="explore"
        className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative z-10"
      >
        <div className="relative w-full flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-light/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-medium text-sm">
              Live Preview
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x tracking-tight text-center">
            Explore MapleCatch in Action
          </h2>

          <div className="w-2/3 h-1 mx-auto bg-gradient-to-r from-primary via-primary-light to-primary rounded-full blur-[2px] opacity-80 mb-6 animate-pulse"></div>

          <p className="text-gray-600 text-center max-w-2xl text-lg leading-relaxed">
            Experience the seamless interface and powerful features that make
            MapleCatch your ultimate shopping companion
          </p>
        </div>

        {/* Enhanced Screenshot Carousel */}
        <div
          ref={carouselRef}
          className="relative flex flex-col sm:flex-row items-center justify-center group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Left Arrow */}
          <button
            onClick={() => goTo("prev")}
            className="absolute left-1 sm:-left-8 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90 text-primary rounded-full p-2 sm:p-3 lg:p-4 z-10 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-primary/20"
            aria-label="Previous screenshot"
          >
            <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </button>

          {/* Screenshot Container */}
          <div className="relative order-1 sm:order-2 mb-8 sm:mb-0">
            {/* Phone Frame */}
            <div className="relative h-[500px] aspect-[2/4.32] rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 transform hover:scale-105 transition-transform duration-500">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>

              {/* Screenshots */}
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    index === current
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  {/* USE NEXT/IMAGE HERE */}
                  <Image
                    src={screenshot.src}
                    alt={`App screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={index === 0} // Prioritize loading the first image
                  />
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
            </div>

            {/* Floating Controls */}
            <div className="absolute -bottom-12 sm:-bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl border border-primary/20 hover:shadow-2xl transition-all duration-300">
              <button
                onClick={() => setPaused(!paused)}
                className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-2"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused ? (
                  <>
                    <FaPlay className="w-4 h-4" />
                    <span className="text-sm font-medium">Play</span>
                  </>
                ) : (
                  <>
                    <FaPause className="w-4 h-4" />
                    <span className="text-sm font-medium">Pause</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description Card */}
          <div className="mt-8 mb-4 px-4 order-2 sm:order-1">
            <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg w-80 mx-auto min-h-[100px] sm:min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary-light rounded-full animate-pulse mr-2 sm:mr-3"></div>
                <span className="text-primary font-medium text-xs sm:text-sm">
                  Current Feature
                </span>
              </div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg text-center leading-relaxed">
                {screenshots[current].desc}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => goTo("next")}
            className="absolute right-1 sm:-right-8 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90 text-primary rounded-full p-2 sm:p-3 lg:p-4 z-10 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-primary/20"
            aria-label="Next screenshot"
          >
            <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex gap-3 mt-12">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative group transition-all duration-300 ${
                index === current ? "scale-125" : "hover:scale-110"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-gradient-to-r from-primary to-primary-light shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {screenshots[index].desc}
              </div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-primary to-primary-light h-1 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((current + 1) / screenshots.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-2">
            {current + 1} of {screenshots.length}
          </p>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Use arrow keys to navigate • Space to pause/play • Swipe on mobile
          </p>
        </div>
      </section>
    </div>
  );
}
