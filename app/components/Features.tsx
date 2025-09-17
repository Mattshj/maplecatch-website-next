"use client";

import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaSearch,
  FaUserAlt,
  FaSignInAlt,
  FaShieldAlt,
  FaHeart,
  FaCog,
  FaMobileAlt,
  FaCheckCircle,
  FaStar,
  FaLeaf,
  FaUsers,
  FaGlobe,
} from "./icons";

const features = [
  {
    id: "smart-lists",
    icon: FaShoppingCart,
    title: "Smart Shopping Lists",
    desc: "Create and manage personalized grocery lists with intelligent suggestions. Add items, mark them as purchased, and stay organized with our intuitive interface.",
    gradient: "from-primary to-primary-light",
    bgGradient: "from-rose-50 to-rose-100",
    borderColor: "border-primary/20",
    stats: "1000+ items",
    highlight: "AI-powered suggestions",
  },
  {
    id: "canadian-brands",
    icon: FaMapMarkerAlt,
    title: "Discover Canadian Brands",
    desc: "Get matched with local Canadian brands based on your selected items. From dairy to snacks, discover authentic Canadian products that support local businesses.",
    gradient: "from-primary-dark to-primary",
    bgGradient: "from-rose-100 to-rose-200",
    borderColor: "border-primary/30",
    stats: "500+ brands",
    highlight: "Local discovery",
  },
  {
    id: "brand-explorer",
    icon: FaSearch,
    title: "Brand Explorer",
    desc: "Browse our growing directory of Canadian brands by category — completely guest-friendly with no login required. Report brand issues directly in the app.",
    gradient: "from-primary-light to-primary",
    bgGradient: "from-rose-50 via-rose-100 to-rose-200",
    borderColor: "border-primary/25",
    stats: "Guest-friendly",
    highlight: "No signup needed",
  },
  {
    id: "personalization",
    icon: FaCog,
    title: "Personalize Your Experience",
    desc: "Choose between light and dark themes. Update your profile with your name, birthdate, phone number, and location for a tailored shopping experience.",
    gradient: "from-primary to-primary-darker",
    bgGradient: "from-rose-100 to-rose-200",
    borderColor: "border-primary/30",
    stats: "2 themes",
    highlight: "Full customization",
  },
  {
    id: "flexible-signin",
    icon: FaSignInAlt,
    title: "Flexible Sign-In Options",
    desc: "Sign in using Apple, Google, or email — or simply continue as a guest to explore the app without creating an account. Your choice, your convenience.",
    gradient: "from-primary-darker to-primary-light",
    bgGradient: "from-rose-50 to-rose-100",
    borderColor: "border-primary/20",
    stats: "4 options",
    highlight: "Guest access",
  },
  {
    id: "privacy-support",
    icon: FaShieldAlt,
    title: "Privacy & Support",
    desc: "Easily access our Privacy Policy, Terms of Use, and Support Center. Your data is protected with industry-standard security measures.",
    gradient: "from-primary-dark to-primary-darker",
    bgGradient: "from-rose-200 to-rose-100",
    borderColor: "border-primary/35",
    stats: "24/7 support",
    highlight: "Secure & private",
  },
];

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    features.forEach((feature) => {
      const element = document.getElementById(feature.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="relative py-20 px-4 overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-primary-light/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-light/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-inter-semibold text-sm">
              Powerful Features
            </span>
          </div>

          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-inter-extrabold mb-6 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x tracking-tight"
          >
            Everything You Need to Shop Local
          </h2>

          <div className="w-2/3 h-1 mx-auto bg-gradient-to-r from-primary via-primary-light to-primary rounded-full blur-[2px] opacity-80 mb-8 animate-pulse"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter-medium">
            Discover the comprehensive suite of features that makes MapleCatch
            your ultimate shopping companion for supporting Canadian businesses
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isVisible = visibleCards.has(feature.id);
            const isHovered = hoveredCard === feature.id;

            return (
              <article
                key={feature.id}
                id={feature.id}
                className={`group relative transform transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="listitem"
                tabIndex={0}
              >
                {/* Card Container */}
                <div
                  className={`relative h-full bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border-2 ${feature.borderColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 cursor-pointer overflow-hidden`}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <IconComponent className="text-2xl text-white" />
                    </div>

                    {/* Icon Glow Effect */}
                    <div
                      className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-inter-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-inter-semibold text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                          {feature.stats}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-4 font-inter-medium">
                      {feature.desc}
                    </p>

                    {/* Highlight Badge */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`}
                      ></div>
                      <span className="text-sm font-inter-semibold text-gray-700">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                  ></div>

                  {/* Border Animation */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    style={{
                      background: `linear-gradient(135deg, transparent, transparent), linear-gradient(135deg, var(--tw-gradient-stops))`,
                      backgroundClip: "padding-box, border-box",
                      backgroundOrigin: "padding-box, border-box",
                    }}
                  ></div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaStar className="text-primary text-xl animate-pulse" />
              <h3 className="text-2xl font-inter-bold text-gray-800">
                Ready to Experience These Features?
              </h3>
              <FaStar className="text-primary text-xl animate-pulse" />
            </div>
            <p className="text-gray-600 font-inter-medium mb-6">
              Download MapleCatch today and start supporting Canadian businesses
              with every purchase
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm font-inter-semibold text-gray-700">
                  Free to download
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                <FaLeaf className="text-green-500" />
                <span className="text-sm font-inter-semibold text-gray-700">
                  Support local
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                <FaUsers className="text-blue-500" />
                <span className="text-sm font-inter-semibold text-gray-700">
                  Community-driven
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
