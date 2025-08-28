import React from "react";

const PrivacyPolicy = () => (
  <section className="relative bg-gradient-to-br from-white via-light-surface-primary to-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 mt-16 border border-light-border-primary">
    {/* Decorative background elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-light-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-light-primary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

    {/* Header with icon */}
    <div className="relative flex items-center gap-3 mb-6">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-light-primary to-light-primaryDark rounded-xl flex items-center justify-center shadow-md">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-inter-bold text-light-primary">
          Privacy Policy
        </h2>
        <p className="text-xs text-light-text-tertiary mt-1">
          Effective Date: July 13, 2025
        </p>
      </div>
    </div>

    <div className="relative space-y-6">
      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">1</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Information We Collect
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary mb-3 leading-relaxed">
          Depending on how you use MapleCatch (as a guest or signed-in user), we
          may collect:
        </p>
        <ul className="list-none space-y-2">
          {[
            "Name, email address, and optional profile picture (if signing in with Google or Apple)",
            "Password (securely managed by Firebase Authentication)",
            "Optional details like birthdate, phone number, and province (used for personalization)",
            "User-generated content such as shopping lists and custom product entries",
            "Messages submitted through support or brand issue reporting",
            "A unique technical identifier (e.g., Firebase user ID)",
            "Basic device and app performance data like crash logs or loading times (via Firebase)",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm sm:text-base text-light-text-secondary"
            >
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-light-primary rounded-full mt-2"></div>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">2</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Guest Access
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Guests can use select features without creating an account. In this
          mode, no personal information (like name or email) is collected or
          linked to your identity. Preferences (e.g., theme mode) may be stored
          locally on your device.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">3</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            How We Use Your Data
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary mb-3 leading-relaxed">
          We use collected data to:
        </p>
        <ul className="list-none space-y-2 mb-3">
          {[
            "Create, secure, and manage user accounts",
            "Enable app features such as list creation, personalization, and reporting",
            "Improve app performance and future product recommendations",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm sm:text-base text-light-text-secondary"
            >
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-light-primary rounded-full mt-2"></div>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We do <strong>not</strong> use your data for advertising, or
          third-party marketing.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">4</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Data Storage
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          All user accounts are secured via Firebase Authentication. Data such
          as shopping lists or preferences is stored on our servers. Cached
          product data may temporarily reside on your device (for up to 7 days)
          to improve performance.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">5</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Data Sharing
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We do not sell, share, or disclose your personal information to third
          parties. Only Google, Apple, and Firebase services are used for
          authentication and data infrastructure.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">6</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Data Deletion
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          When you delete your account, all associated data — including custom
          products and lists — is permanently removed. Deletion requests require
          email verification to protect your account.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">7</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Voluntary Support
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          If you choose to support us through third-party platforms like Ko‑fi,
          your payment information is never handled by MapleCatch. All donations
          are optional and processed externally.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">8</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Apple Sign-In
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Sign in with Apple is available and complies with privacy requirements
          by allowing you to hide your email and limiting shared information to
          name and email. No additional tracking or advertising is performed
          based on this data.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">9</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Authentication Emails
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We send only account-related emails (such as verification or password
          reset) from <strong>noreply@maplecatch.com</strong>. We do not send
          promotional or marketing content.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">10</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Brand Information
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary mb-3 leading-relaxed">
          MapleCatch displays publicly available Canadian brand information to
          help users discover local businesses. Content is sourced from public
          data, user contributions, or AI-generated summaries.
        </p>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We do not claim ownership of any third-party brand names. Inclusion of
          brand content does not imply endorsement or affiliation unless
          explicitly noted. Users may report any inaccuracies through the app.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">11</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Updates to This Policy
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We may revise this policy to reflect app improvements or legal
          updates. You will be notified in-app if changes are material.
          Continued use of the app implies acceptance of the updated policy.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">12</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Contact Us
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, reach
          out to us at support@maplecatch.com.
        </p>
      </div>
    </div>
  </section>
);

export default PrivacyPolicy;
