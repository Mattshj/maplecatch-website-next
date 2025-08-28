// app/components/HelpCenterServer.tsx
import React from "react";

export interface FAQ {
  question: string;
  answer: string;
}

interface HelpCenterServerProps {
  faqs: FAQ[];
  expandedIndex?: number | null;
  onToggle?: (index: number) => void;
  isClient?: boolean;
}

const HelpCenterServer = ({
  faqs,
  expandedIndex,
  onToggle,
  isClient,
}: HelpCenterServerProps) => {
  return (
    <section className="relative bg-gradient-to-br from-white via-light-surface-primary to-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 mt-16 border border-light-border-primary">
      {/* Header */}
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-inter-bold text-light-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-light-text-secondary mt-1">
            Find answers to common questions about MapleCatch
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-xl border border-light-border-primary shadow-sm overflow-hidden"
          >
            {isClient ? (
              <>
                <button
                  onClick={() => onToggle?.(idx)}
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 font-inter-semibold text-left text-sm sm:text-base text-light-text-primary focus:outline-none hover:bg-light-surface-primary/30 transition-colors duration-200"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transition-transform duration-300 ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedIndex === idx && (
                  <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-light-text-secondary leading-relaxed border-t border-light-border-secondary">
                    {faq.answer}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-light-text-secondary">
                {faq.question}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpCenterServer;
