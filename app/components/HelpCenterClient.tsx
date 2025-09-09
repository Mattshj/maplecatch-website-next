"use client";

import React, { useState } from "react";
import HelpCenterServer from "./HelpCenterServer";

const FAQS = [
  {
    question: "Can I use the app without an account?",
    answer:
      "Yes. You can explore brands, view the lottery screen, and access settings (including light/dark theme) as a guest without signing in. However, creating shopping lists, reporting brands, or updating your profile requires signing in.",
  },
  {
    question: "How can I create an account?",
    answer:
      "You can sign up using your email and password, Google account, or Sign in with Apple. Email verification is required before accessing full features.",
  },
  {
    question: "Is Apple Sign-In supported?",
    answer:
      "Yes. You can sign in using Apple, which offers enhanced privacy by letting you hide your email address. This login option meets App Store privacy guidelines.",
  },
  {
    question: "I didn't receive a verification email. What should I do?",
    answer:
      "When you try to log in without verifying your email, you'll be prompted to resend the verification email from within the app.",
  },
  {
    question: "How do shopping lists work?",
    answer:
      "You can create shopping lists by selecting from a curated list of products or adding your own custom items. Your lists are saved securely and only visible to you.",
  },
  {
    question: "Can I add custom products?",
    answer:
      "Yes. You can create and manage custom products that are unique to your account. These are not shared publicly or reviewed by our team unless flagged.",
  },
  {
    question: "Where do the local brand suggestions come from?",
    answer:
      "Brand suggestions are generated using AI based on the items in your shopping list. If a brand appears to be incorrect, you can report it directly from the app.",
  },
  {
    question: "Are brand recommendations based on my location?",
    answer:
      "Not currently. We're working to introduce location-based personalization in a future update.",
  },
  {
    question: "What is the Lottery section?",
    answer:
      "We're launching exciting partnerships with Canadian businesses. Soon, you'll be able to enter giveaways and support local brands directly from the app. Stay tuned!",
  },
  {
    question: "How do I change my theme?",
    answer:
      "You can switch between light and dark mode in the Settings section. This feature is available even in guest mode.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Use the 'Forgot Password' link on the login screen to reset your password. You'll need access to your email to complete the reset.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes. After signing in, go to Settings → Account & Security → Delete Account. You'll need to verify your identity via email.",
  },
  {
    question: "How do I contact support?",
    answer:
      "If you're having trouble, contact us at support@maplecatch.com. We're happy to help!",
  },
];

const HelpCenterClient = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <HelpCenterServer
      faqs={FAQS}
      expandedIndex={expandedIndex}
      onToggle={handleToggle}
      isClient={true}
    />
  );
};

export default HelpCenterClient;
