import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <div id="hero">
      {/* Main Hero Section */}
      <section className="mt-24 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 sm:px-12 py-20 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50 max-w-[1200px] mx-auto rounded-3xl shadow-xl">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-xl">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-xs mb-3 tracking-wide">
            MapleCatch 12+
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[3rem] leading-tight font-extrabold text-primary mb-4 drop-shadow-sm">
            Your local shopping buddy
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 font-medium">
            MapleCatch helps you shop smarter and support local Canadian
            businesses — all in one simple, powerful app.
          </p>
          <ul className="text-base sm:text-lg text-gray-600 mb-8 space-y-2 text-left list-disc list-inside">
            <li>
              Create and manage shopping lists using curated product options or
              your own custom items.
            </li>
            <li>
              As you build your list, MapleCatch recommends matching Canadian
              brands to help you buy local with confidence.
            </li>
          </ul>
          <div className="flex flex-wrap justify-center items-center lg:justify-start gap-4 mb-8">
            <a
              href="https://apps.apple.com/app/maplecatch/id6748413094"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/assets/download-on-app-store.svg"
                alt="Download on the App Store"
                width={120}
                height={48}
                style={{ width: "120px", height: "48px" }}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.matthewjaberi.maplecatch&hl=en_US"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/assets/GoogleBadge.png"
                alt="Get it on Google Play"
                width={120}
                height={42}
                style={{ width: "120px", height: "42px" }}
              />
            </a>
          </div>
        </div>

        {/* Screenshot Image */}
        <div className="flex justify-center flex-1 max-w-md">
          <Image
            src="/assets/AppScreen.png"
            alt="App Screenshot"
            className="w-[200px] sm:max-w-[320px] sm:w-full object-contain rounded-3xl shadow-2xl border-2 border-primary/20 bg-white"
            width={320}
            height={640}
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
