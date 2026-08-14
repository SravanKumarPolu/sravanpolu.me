import React from "react";
import type { ProjectStatus } from "../constants/portfolio";

const STATUS_META: Record<
  ProjectStatus,
  { label: string; className: string; dot: string }
> = {
  production: {
    label: "Production",
    className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400",
  },
  beta: {
    label: "Beta",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400",
  },
  client: {
    label: "Client work",
    className: "border-blue-500/30 bg-blue-500/15 text-blue-300",
    dot: "bg-blue-400",
  },
  "client-demo": {
    label: "Client Demo · In Development",
    className: "border-violet-500/30 bg-violet-500/15 text-violet-300",
    dot: "bg-violet-400",
  },
  learning: {
    label: "Learning",
    className: "border-white/15 bg-white/10 text-neutral-300",
    dot: "bg-neutral-400",
  },
};

const ProjectStatusBadge: React.FC<{ status: ProjectStatus; className?: string }> = ({
  status,
  className = "",
}) => {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${meta.className} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} aria-hidden />
      {meta.label}
    </span>
  );
};

export default ProjectStatusBadge;
