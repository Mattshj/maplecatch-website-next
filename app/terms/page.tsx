import React from "react";

const TermsOfService = () => (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-inter-bold text-light-primary">
          Terms of Service
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
            Eligibility & Access
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          MapleCatch offers both guest access and account-based access. Users
          can explore selected features without creating an account. To access
          full features like shopping list creation, local brand suggestions,
          and profile customization, users must sign in using Apple, Google, or
          email/password. Verified email is required for full account
          functionality.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">2</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            User Conduct
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary mb-3 leading-relaxed">
          You agree not to:
        </p>
        <ul className="list-none space-y-2">
          {[
            "Use offensive, abusive, or inappropriate language.",
            "Submit false or misleading product or brand information.",
            "Abuse the report feature or submit fraudulent reports.",
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
            <span className="text-xs font-bold text-light-primary">3</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Shopping Lists & Custom Products
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Custom products are user-generated and visible only to the creator.
          While we do not moderate this content, we may remove inappropriate or
          flagged entries at our discretion.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">4</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Content Ownership
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          You retain ownership of your content (e.g., custom items, shopping
          lists). By using MapleCatch, you grant us permission to use
          anonymized, aggregated data to enhance app functionality and improve
          recommendations.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">5</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Lottery Feature
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Lottery participation details and eligibility will be shared in future
          updates. Participation may be subject to regional laws and age
          restrictions.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">6</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Guest Access
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Guests can browse brands, access theme preferences, view legal
          content, and explore upcoming features. Account creation is required
          for interactive and personalized features such as list management and
          reporting.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">7</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Service Availability
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Features may be added, removed, or modified without prior notice. We
          are not responsible for data loss or access interruptions due to
          maintenance, system errors, or third-party service outages.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">8</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Limitation of Liability
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We are not liable for inaccurate product or brand data, missed lottery
          outcomes, or actions taken based on user-generated content. MapleCatch
          also disclaims responsibility for third-party services or platform
          outages.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">9</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Voluntary Support
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          Users may optionally support MapleCatch development through platforms
          like Ko‑fi. These contributions are voluntary and do not unlock
          exclusive features. Payment processing is handled externally and
          securely by Ko‑fi.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">10</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Account Termination
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          We may suspend or delete accounts for Terms violations or legal
          noncompliance. Users can also request account deletion through the
          Support Center. Email verification is required for deletion or
          password changes.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">11</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Changes to These Terms
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          These Terms may be updated periodically. You will be notified of
          changes within the app or via your registered email. Continued use of
          the app implies acceptance of revised terms.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">12</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Communication
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          All official communication for account recovery or verification is
          sent from noreply@maplecatch.com. No sensitive actions will be
          requested via other email addresses.
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-light-border-primary shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-light-primary/20 to-light-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-light-primary">13</span>
          </div>
          <h3 className="text-base sm:text-lg font-inter-semibold text-light-text-primary">
            Contact Us
          </h3>
        </div>
        <p className="text-sm sm:text-base text-light-text-secondary leading-relaxed">
          For questions, concerns, or support requests, contact us at
          support@maplecatch.com.
        </p>
      </div>
    </div>
  </section>
);

export default TermsOfService;
