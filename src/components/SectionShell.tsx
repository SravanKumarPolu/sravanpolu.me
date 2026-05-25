import React from "react";
import { motion } from "framer-motion";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "elevated";
};

/** Shared section background — reduces duplicated motion markup */
const SectionShell: React.FC<SectionShellProps> = ({
  id,
  className = "",
  children,
  variant = "default",
}) => {
  const bg =
    variant === "elevated"
      ? "bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950"
      : "bg-gradient-to-br from-neutral-950 via-purple-950/40 to-neutral-950";

  return (
    <section id={id} className={`py-12 sm:py-16 md:py-20 lg:py-24 ${bg} relative overflow-hidden text-white ${className}`}>
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>
      <motion.div
        className="absolute top-24 right-16 w-24 h-24 rounded-2xl bg-cyan-500/10 pointer-events-none"
        aria-hidden
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default SectionShell;
