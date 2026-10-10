import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import SectionShell from "./SectionShell";
import { fiverrProfileUrl } from "../constants";
import subbaGAvatar from "../assets/images/subba_g.webp";

const testimonial = {
  name: "Subba G.",
  role: "Project owner",
  company: "Fiverr",
  content:
    "Sravan took ownership of the project, understood my vision quickly, and delivered adjustments with polite communication and fast turnaround. I would work with him again.",
  rating: 5,
  avatar: subbaGAvatar,
};

const Testimonials: React.FC = () => {
  return (
    <SectionShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-4">
            <span className="text-cyan-400 text-sm font-medium">Client feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">What clients say</h2>
          <p className="text-neutral-400 mt-3 text-base sm:text-lg">
            Feedback from a recent freelance delivery.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg" aria-hidden>
                ★
              </span>
            ))}
          </div>
          <blockquote className="text-neutral-200 text-base sm:text-lg leading-relaxed mb-6">
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
          <div className="flex flex-wrap items-center gap-4">
            <img
              src={testimonial.avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-white/20"
              width={48}
              height={48}
              loading="lazy"
            />
            <div>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-neutral-400">
                {testimonial.role} · {testimonial.company}
              </p>
            </div>
            <a
              href={fiverrProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verified on Fiverr - client feedback (opens Fiverr profile in a new tab)"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-neutral-200 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px] transition-colors"
            >
              Verified on Fiverr
              <FiExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        </motion.article>
      </div>
    </SectionShell>
  );
};

export default Testimonials;
