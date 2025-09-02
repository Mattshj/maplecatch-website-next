import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-cocoa-900 via-cocoa-800 to-near-black text-white pt-10 pb-4 mt-10 border-t-4 border-primary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-primary/20">
          {/* Logo & About */}
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/assets/Logo.png"
              alt="MapleCatch Logo"
              width={160}
              height={48}
              className="h-12 w-auto mb-2"
            />

            <p className="text-sm text-white/80 max-w-xs">
              MapleCatch helps you shop smarter and support local Canadian
              businesses — all in one simple, powerful app. Create shopping
              lists, discover Canadian brands, and personalize your experience.
              Your local shopping buddy!
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/maplecatch/"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="mailto:support@maplecatch.com"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors text-white/80"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors text-white/80"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors text-white/80"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@maplecatch.com"
                  className="hover:text-primary transition-colors text-white/80"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://ko-fi.com/maplecatch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-colors shadow-md border-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Support us on Ko-fi"
                >
                  <span role="img" aria-label="coffee">
                    ☕
                  </span>{" "}
                  Support us on Ko-fi
                </a>
              </li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">
              Get the App
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/app/maplecatch/id6748413094"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/download-on-app-store.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.matthewjaberi.maplecatch&hl=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/GoogleBadge.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-xs text-white/60 gap-2">
          <span>
            &copy; {new Date().getFullYear()} MapleCatch. All rights reserved.
          </span>
          <span>
            Made with <span className="text-primary">♥</span> in Canada
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
