"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const sections = [
  { key: "home", label: "Home", path: "/#hero" },
  { key: "features", label: "Features", path: "/#features" },
  { key: "explore", label: "Explore", path: "/#explore" },
];

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const HEADER_HEIGHT = 64;

const Navigation: React.FC<NavigationProps> = ({ setIsMobileMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: (typeof sections)[number]
  ) => {
    if (section.path.startsWith("/#")) {
      e.preventDefault();
      const id = section.path.replace("/#", "");

      if (pathname !== "/") {
        router.push(`/#${id}`);
        setIsMobileMenuOpen(false);
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        const y =
          el.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className="flex flex-col md:flex-row items-center gap-6 md:gap-6 bg-transparent w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      {sections.map((section) => {
        const isActive =
          section.path === "/"
            ? pathname === "/"
            : section.path.startsWith("#")
            ? false
            : pathname?.startsWith(section.path);

        return (
          <a
            key={section.key}
            href={section.path}
            onClick={(e) => handleLinkClick(e, section)}
            className={`
              font-semibold px-5 py-2 rounded-xl transition-all duration-200 border border-rose-200 shadow-md
              text-lg md:text-base relative
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white/80
              ${
                isActive
                  ? "bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary-dark hover:to-primary-darker shadow-lg"
                  : "bg-rose-200 text-primary hover:bg-rose-100 hover:text-primary-dark"
              }
            `}
            aria-current={isActive ? "page" : undefined}
            aria-label={
              section.path.startsWith("/#")
                ? `${section.label} section`
                : section.label
            }
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
};

export default Navigation;
