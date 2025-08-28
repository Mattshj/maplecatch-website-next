import React from "react";
import {
  FaListAlt,
  FaSearch,
  FaUserAlt,
  FaSignInAlt,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaListAlt className="text-2xl text-[#C62828]" />, // Smart Shopping Lists
    title: "Smart Shopping Lists",
    desc: "Create and manage personalized grocery lists. Add items, mark them as purchased, and stay organized.",
  },
  {
    icon: <FaListAlt className="text-2xl text-[#C62828]" />, // Discover Canadian Brands
    title: "Discover Canadian Brands",
    desc: "Get matched with local brands based on your selected items — from dairy to snacks and more.",
  },
  {
    icon: <FaSearch className="text-2xl text-[#C62828]" />, // Brand Explorer
    title: "Brand Explorer (Guest-Friendly)",
    desc: "Browse a growing directory of Canadian brands by category — no login required. Report brand issues directly in the app.",
  },
  {
    icon: <FaUserAlt className="text-2xl text-[#C62828]" />, // Personalize
    title: "Personalize Your Experience",
    desc: "Choose between light and dark themes. Update your profile with your name, birthdate, phone number, and location.",
  },
  {
    icon: <FaSignInAlt className="text-2xl text-[#C62828]" />, // Flexible Sign-In
    title: "Flexible Sign-In Options",
    desc: "Sign in using Apple, Google, or email — or simply continue as a guest to explore the app without creating an account.",
  },
  {
    icon: <FaShieldAlt className="text-2xl text-[#C62828]" />, // Privacy & Support
    title: "Privacy & Support",
    desc: "Easily access our Privacy Policy, Terms of Use, and Support Center.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="max-w-5xl mx-auto mt-40 scroll-mt-16 px-2">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#C62828] mb-6 text-center pt-20 ">
      Key Features
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-[#C62828]/10 hover:shadow-2xl transition-shadow"
        >
          <div className="mb-3">{f.icon}</div>
          <h3 className="font-semibold text-lg text-[#C62828] mb-2">
            {f.title}
          </h3>
          <p className="text-gray-600 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
