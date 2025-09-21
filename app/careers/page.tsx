import { Metadata } from "next";
import {
  FaBriefcase,
  FaEnvelope,
  FaHeart,
  FaUsers,
  FaLeaf,
} from "../components/icons";

export const metadata: Metadata = {
  title: "Careers - Join Our Team",
  description:
    "Explore career opportunities at MapleCatch. We're building the future of local shopping in Canada. Currently no positions available, but we'd love to hear from passionate individuals.",
  keywords: [
    "MapleCatch careers",
    "jobs at MapleCatch",
    "Canadian tech jobs",
    "local shopping careers",
    "startup jobs Canada",
    "remote work opportunities",
  ],
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at MapleCatch - Join Our Mission",
    description:
      "Help us build the future of local shopping in Canada. Currently no positions available, but we welcome passionate individuals.",
    url: "https://maplecatch.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-light/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <FaBriefcase className="text-primary text-sm" />
            <span className="text-primary font-inter-semibold text-sm">
              Careers at MapleCatch
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-inter-extrabold mb-6 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Join Our Mission
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter-medium mb-8">
            Help us build the future of local shopping in Canada. We're
            passionate about supporting Canadian businesses and creating
            meaningful connections in our communities.
          </p>
        </div>
      </section>

      {/* Current Status Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBriefcase className="text-white text-2xl" />
            </div>

            <h2 className="text-3xl font-inter-bold text-gray-800 mb-4">
              Currently No Open Positions
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're not actively hiring at the moment, but we're always
              interested in connecting with passionate individuals who share our
              vision of supporting Canadian businesses and communities.
            </p>

            <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-inter-semibold text-gray-800 mb-4">
                Why Work With Us?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <FaHeart className="text-primary text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter-semibold text-gray-800 mb-1">
                      Mission-Driven
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Help support Canadian businesses and local communities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaUsers className="text-primary text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter-semibold text-gray-800 mb-1">
                      Collaborative Team
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Work with passionate people who care about making a
                      difference
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaLeaf className="text-primary text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter-semibold text-gray-800 mb-1">
                      Sustainable Growth
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Be part of a company focused on long-term impact
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaBriefcase className="text-primary text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter-semibold text-gray-800 mb-1">
                      Flexible Work
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Remote-first culture with flexible hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-inter-semibold text-gray-800 mb-4">
                Stay Connected
              </h3>

              <p className="text-gray-600 mb-6">
                Even though we're not hiring right now, we'd love to hear from
                you! Send us your resume and a note about why you're interested
                in MapleCatch.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@maplecatch.com?subject=Future Career Opportunity - MapleCatch"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-full font-inter-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FaEnvelope className="text-sm" />
                  Send Your Resume
                </a>

                <a
                  href="mailto:support@maplecatch.com?subject=General Inquiry"
                  className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-full font-inter-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaEnvelope className="text-sm" />
                  General Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-inter-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at MapleCatch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-inter-semibold text-gray-800 mb-3">
                Community First
              </h3>
              <p className="text-gray-600">
                We believe in supporting local communities and Canadian
                businesses. Every decision we make is guided by our commitment
                to making a positive impact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-inter-semibold text-gray-800 mb-3">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We work together as a team, valuing diverse perspectives and
                fostering an inclusive environment where everyone can contribute
                their best.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-darker rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-inter-semibold text-gray-800 mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We're building for the long term, focusing on sustainable growth
                and practices that benefit our users, partners, and the
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-inter-bold text-gray-800 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Even if we're not hiring right now, we'd love to connect with
            passionate individuals who share our vision.
          </p>
          <a
            href="mailto:support@maplecatch.com?subject=Future Career Opportunity - MapleCatch"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-full font-inter-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaEnvelope className="text-lg" />
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
