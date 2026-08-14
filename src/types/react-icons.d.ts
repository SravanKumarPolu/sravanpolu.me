// Type declarations for react-icons
// react-icons v5 ships types that resolve IconType to React.ReactNode, which is not
// a valid JSX element under React 18 + TS 4.9. These ambient module declarations
// shadow the package's own types so the icons we use type as standard SVG components.

declare module "react-icons/fi" {
  import type { ComponentType, SVGProps } from "react";

  type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

  export const FiArrowRight: IconComponent;
  export const FiArrowUpRight: IconComponent;
  export const FiBookOpen: IconComponent;
  export const FiBriefcase: IconComponent;
  export const FiChevronDown: IconComponent;
  export const FiClock: IconComponent;
  export const FiCloud: IconComponent;
  export const FiDownload: IconComponent;
  export const FiExternalLink: IconComponent;
  export const FiFileText: IconComponent;
  export const FiGithub: IconComponent;
  export const FiLink: IconComponent;
  export const FiMail: IconComponent;
  export const FiMapPin: IconComponent;
}

declare module "react-icons/si" {
  import type { ComponentType, SVGProps } from "react";

  type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

  export const SiBootstrap: IconComponent;
  export const SiDocker: IconComponent;
  export const SiExpress: IconComponent;
  export const SiFigma: IconComponent;
  export const SiFramer: IconComponent;
  export const SiGit: IconComponent;
  export const SiGraphql: IconComponent;
  export const SiJavascript: IconComponent;
  export const SiMongodb: IconComponent;
  export const SiNetlify: IconComponent;
  export const SiNextdotjs: IconComponent;
  export const SiNodedotjs: IconComponent;
  export const SiPostgresql: IconComponent;
  export const SiReact: IconComponent;
  export const SiTailwindcss: IconComponent;
  export const SiThreedotjs: IconComponent;
  export const SiTypescript: IconComponent;
  export const SiVercel: IconComponent;
}
