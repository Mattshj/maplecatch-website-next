"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "./icons";

import Navigation from "./Navigation";

// Optimize framer-motion imports - using direct motion components

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".mobile-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 shadow-lg transition-colors duration-300
          ${
            isOpen
              ? "bg-white"
              : "bg-gradient-to-b from-white via-white to-rose-200"
          }
          text-cocoa-900`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/assets/Logo.png"
            alt="MapleCatch Logo"
            className=" object-contain drop-shadow-md group-hover:rotate-[-6deg] transition-transform duration-300"
            width={140}
            height={140}
          />
        </motion.a>

        {/* Desktop navigation */}
        <div className="flex-1 flex items-center justify-end">
          <div className="hidden md:flex">
            <Navigation
              isMobileMenuOpen={isOpen}
              setIsMobileMenuOpen={setIsOpen}
            />
          </div>
        </div>

        {/* Mobile toggle button */}
        <motion.button
          className="md:hidden text-2xl p-2 rounded-lg text-primary hover:bg-red-100 transition-colors mobile-menu z-[101]"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center md:hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-[90vw] max-w-sm bg-white/80 backdrop-blur-xl border border-rose-200 rounded-3xl shadow-2xl flex flex-col items-center py-10 px-6 gap-8">
                <button
                  className="absolute top-4 right-4 text-3xl text-primary bg-white/70 rounded-full p-2 shadow hover:bg-rose-100 transition-all z-10"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
                <Navigation
                  isMobileMenuOpen={isOpen}
                  setIsMobileMenuOpen={setIsOpen}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-primary-light"
            style={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.header>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-all duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
